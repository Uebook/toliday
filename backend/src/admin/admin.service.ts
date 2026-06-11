import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Hotel, HotelStatus } from '../hotel/entities/hotel.entity';
import {
  TourPartner,
  PartnerStatus as TourPartnerStatus,
} from '../packages/entities/tour-partner.entity';
import {
  BusVendor,
  BusVendorStatus,
} from '../buses/entities/bus-vendor.entity';
import { CabVendor } from '../cabs/entities/cab-vendor.entity';
import { Booking, BookingStatus } from '../booking/entities/booking.entity';
import {
  BusBooking,
  BookingStatus as BusBookingStatus,
} from '../buses/entities/bus-booking.entity';
import {
  CabBooking,
  CabBookingStatus,
} from '../cabs/entities/cab-booking.entity';
import { Staff } from '../staff/entities/staff.entity';
import { Promotion } from '../promotions/entities/promotion.entity';
import { RoomType } from '../room-type/entities/room-type.entity';
import {
  TourPackage,
  PackageStatus,
} from '../packages/entities/tour-package.entity';
import { Bus } from '../buses/entities/bus.entity';
import { Vehicle } from '../cabs/entities/vehicle.entity';
import { GlobalSetting } from '../settings/entities/global-setting.entity';
import {
  LedgerEntry,
  LedgerEntryType,
  VerticalType,
} from '../finance/entities/ledger-entry.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
    @InjectRepository(TourPartner)
    private tourPartnerRepository: Repository<TourPartner>,
    @InjectRepository(BusVendor)
    private busVendorRepository: Repository<BusVendor>,
    @InjectRepository(CabVendor)
    private cabVendorRepository: Repository<CabVendor>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(BusBooking)
    private busBookingRepository: Repository<BusBooking>,
    @InjectRepository(CabBooking)
    private cabBookingRepository: Repository<CabBooking>,
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
    @InjectRepository(RoomType)
    private roomTypeRepository: Repository<RoomType>,
    @InjectRepository(TourPackage)
    private tourPackageRepository: Repository<TourPackage>,
    @InjectRepository(Bus)
    private busRepository: Repository<Bus>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(GlobalSetting)
    private settingsRepository: Repository<GlobalSetting>,
    @InjectRepository(LedgerEntry)
    private ledgerRepository: Repository<LedgerEntry>,
  ) {}

  // Settlement Logic
  async processSettlements() {
    const settings = await this.settingsRepository.find();
    const getRate = (key: string) =>
      parseFloat(settings.find((s) => s.key === key)?.value || '0') / 100;

    const rates = {
      HOTEL: getRate('COMMISSION_HOTEL'),
      PACKAGE: getRate('COMMISSION_PACKAGE'),
      BUS: getRate('COMMISSION_BUS'),
      CAB: getRate('COMMISSION_CAB'),
    };

    let processedCount = 0;
    let totalVolume = 0;

    // 1. Process Hotel/Package Bookings
    const hotelBookings = await this.bookingRepository.find({
      where: { status: BookingStatus.COMPLETED, isSettled: false },
    });

    for (const b of hotelBookings) {
      const vertical = b.hotelId ? VerticalType.HOTEL : VerticalType.PACKAGE;
      const rate = rates[vertical];
      const commission = Number(b.totalAmount) * rate;
      const net = Number(b.totalAmount) - commission;

      b.commissionAmount = commission;
      b.netAmount = net;
      b.isSettled = true;
      await this.bookingRepository.save(b);

      await this.createLedgerEntry(
        b.hotelId || b.tourPartnerId,
        vertical,
        net,
        `Settlement for Booking #${b.bookingReference}`,
        b.id,
      );
      processedCount++;
      totalVolume += net;
    }

    // 2. Process Bus Bookings
    const busBookings = await this.busBookingRepository
      .createQueryBuilder('bb')
      .leftJoinAndSelect('bb.schedule', 's')
      .leftJoinAndSelect('s.bus', 'b')
      .where('bb.status = :status', { status: 'CONFIRMED' }) // For buses, confirmed is usually final
      .andWhere('bb.isSettled = :settled', { settled: false })
      .getMany();

    for (const b of busBookings) {
      const rate = rates[VerticalType.BUS];
      const commission = Number(b.totalFare) * rate;
      const net = Number(b.totalFare) - commission;

      b.commissionAmount = commission;
      b.netAmount = net;
      b.isSettled = true;
      await this.busBookingRepository.save(b);

      await this.createLedgerEntry(
        b.schedule.bus.vendorId,
        VerticalType.BUS,
        net,
        `Settlement for Bus PNR ${b.pnr}`,
        b.id,
      );
      processedCount++;
      totalVolume += net;
    }

    // 3. Process Cab Bookings
    const cabBookings = await this.cabBookingRepository.find({
      where: { status: CabBookingStatus.COMPLETED, isSettled: false },
    });

    for (const b of cabBookings) {
      const rate = rates[VerticalType.CAB];
      const commission = Number(b.totalAmount) * rate;
      const net = Number(b.totalAmount) - commission;

      b.commissionAmount = commission;
      b.netAmount = net;
      b.isSettled = true;
      await this.cabBookingRepository.save(b);

      await this.createLedgerEntry(
        b.vendorId,
        VerticalType.CAB,
        net,
        `Settlement for Cab Booking ${b.bookingId}`,
        b.id,
      );
      processedCount++;
      totalVolume += net;
    }

    return { processedCount, totalVolume };
  }

  private async createLedgerEntry(
    vendorId: string,
    vertical: VerticalType,
    amount: number,
    description: string,
    referenceId: string,
  ) {
    const entry = this.ledgerRepository.create({
      vendorId,
      vertical,
      amount,
      description,
      referenceId,
      type: LedgerEntryType.CREDIT,
    });
    return this.ledgerRepository.save(entry);
  }

  async updatePromotionStatus(id: string, isVerified: boolean) {
    const promo = await this.promotionRepository.findOne({ where: { id } });
    if (!promo) throw new NotFoundException('Promotion not found');
    promo.isVerified = isVerified;
    return this.promotionRepository.save(promo);
  }

  // ... (Rest of the previous methods)
  async getDashboardStats() {
    const totalHotels = await this.hotelRepository.count();
    const totalTourPartners = await this.tourPartnerRepository.count();
    const totalBusVendors = await this.busVendorRepository.count();
    const totalCabVendors = await this.cabVendorRepository.count();

    const hotelRevenue = await this.bookingRepository
      .createQueryBuilder('b')
      .where('b.hotelId IS NOT NULL')
      .select('SUM(b.totalAmount)', 'sum')
      .getRawOne();
    const packageRevenue = await this.bookingRepository
      .createQueryBuilder('b')
      .where('b.tourPartnerId IS NOT NULL')
      .select('SUM(b.totalAmount)', 'sum')
      .getRawOne();
    const busRevenue = await this.busBookingRepository
      .createQueryBuilder('b')
      .select('SUM(b.totalFare)', 'sum')
      .getRawOne();
    const cabRevenue = await this.cabBookingRepository
      .createQueryBuilder('b')
      .select('SUM(b.totalAmount)', 'sum')
      .getRawOne();

    const hRev = parseFloat(hotelRevenue.sum || '0');
    const pRev = parseFloat(packageRevenue.sum || '0');
    const bRev = parseFloat(busRevenue.sum || '0');
    const cRev = parseFloat(cabRevenue.sum || '0');

    const recentBookings = await this.findAllBookings();
    return {
      counts: {
        hotels: totalHotels,
        packages: totalTourPartners,
        buses: totalBusVendors,
        cabs: totalCabVendors,
      },
      revenue: {
        hotels: hRev,
        packages: pRev,
        buses: bRev,
        cabs: cRev,
        total: hRev + pRev + bRev + cRev,
      },
      activity: recentBookings.slice(0, 10),
    };
  }

  async findAllHotels(status?: HotelStatus) {
    const where = status ? { status } : {};
    return this.hotelRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async findHotelById(id: string) {
    const hotel = await this.hotelRepository.findOne({
      where: { id },
      relations: ['staffs', 'roomTypes', 'bookings'],
    });
    if (!hotel) throw new NotFoundException('Hotel not found');
    const offers = await this.promotionRepository.find({
      where: { vendorId: id },
    });
    return { ...hotel, offers };
  }

  async updateHotelStatus(id: string, status: HotelStatus) {
    const hotel = await this.hotelRepository.findOne({ where: { id } });
    if (!hotel) throw new NotFoundException('Hotel not found');
    hotel.status = status;
    if (status === HotelStatus.APPROVED) hotel.isVerified = true;
    return this.hotelRepository.save(hotel);
  }

  async updateHotelDetails(id: string, data: any) {
    const hotel = await this.hotelRepository.findOne({ where: { id } });
    if (!hotel) throw new NotFoundException('Hotel not found');
    Object.assign(hotel, data);
    return this.hotelRepository.save(hotel);
  }

  async updateHotelRoom(roomId: string, data: any) {
    const room = await this.roomTypeRepository.findOne({ where: { id: roomId } });
    if (!room) throw new NotFoundException('Room not found');
    Object.assign(room, data);
    return this.roomTypeRepository.save(room);
  }

  async addHotelRoom(hotelId: string, data: any) {
    const room = this.roomTypeRepository.create({ ...data, hotelId });
    return this.roomTypeRepository.save(room);
  }

  async deleteHotelRoom(id: string) {
    return this.roomTypeRepository.delete(id);
  }

  async findAllTourPartners(status?: TourPartnerStatus) {
    const where = status ? { status } : {};
    return this.tourPartnerRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async findTourPartnerById(id: string) {
    const partner = await this.tourPartnerRepository.findOne({
      where: { id },
      relations: ['staffs', 'packages', 'bookings'],
    });
    if (!partner) throw new NotFoundException('Tour partner not found');
    const offers = await this.promotionRepository.find({
      where: { vendorId: id },
    });
    return { ...partner, offers };
  }

  async updateTourPartnerStatus(id: string, status: TourPartnerStatus) {
    const partner = await this.tourPartnerRepository.findOne({ where: { id } });
    if (!partner) throw new NotFoundException('Partner not found');
    partner.status = status;
    if (status === TourPartnerStatus.APPROVED) partner.isVerified = true;
    return this.tourPartnerRepository.save(partner);
  }

  async addTourPackage(partnerId: string, data: any) {
    const pkg = this.tourPackageRepository.create({
      ...data,
      partnerId,
      status: PackageStatus.ACTIVE,
    });
    return this.tourPackageRepository.save(pkg);
  }

  async deleteTourPackage(id: string) {
    return this.tourPackageRepository.delete(id);
  }

  async findAllBusVendors(status?: BusVendorStatus) {
    const where = status ? { status } : {};
    return this.busVendorRepository.find({
      where,
      order: { createdAt: 'DESC' },
      relations: ['buses'],
    });
  }

  async findBusVendorById(id: string) {
    const vendor = await this.busVendorRepository.findOne({
      where: { id },
      relations: ['staffs', 'buses'],
    });
    if (!vendor) throw new NotFoundException('Bus vendor not found');
    const bookings = await this.busBookingRepository
      .createQueryBuilder('bb')
      .leftJoinAndSelect('bb.schedule', 's')
      .leftJoinAndSelect('s.bus', 'b')
      .where('b.vendorId = :id', { id })
      .orderBy('bb.createdAt', 'DESC')
      .getMany();
    const offers = await this.promotionRepository.find({
      where: { vendorId: id },
    });
    return { ...vendor, bookings, offers };
  }

  async updateBusVendorStatus(id: string, status: BusVendorStatus) {
    const vendor = await this.busVendorRepository.findOne({ where: { id } });
    if (!vendor) throw new NotFoundException('Vendor not found');
    vendor.status = status;
    if (status === BusVendorStatus.APPROVED) vendor.isVerified = true;
    return this.busVendorRepository.save(vendor);
  }

  async addBusFleet(vendorId: string, data: any) {
    const bus = this.busRepository.create({ ...data, vendorId });
    return this.busRepository.save(bus);
  }

  async deleteBusFleet(id: string) {
    return this.busRepository.delete(id);
  }

  async findAllCabVendors() {
    return this.cabVendorRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['vehicles', 'drivers'],
    });
  }

  async findCabVendorById(id: string) {
    const vendor = await this.cabVendorRepository.findOne({
      where: { id },
      relations: ['vehicles', 'drivers'],
    });
    if (!vendor) throw new NotFoundException('Cab vendor not found');
    const bookings = await this.cabBookingRepository.find({
      where: { vendorId: id },
      order: { createdAt: 'DESC' },
      relations: ['vehicle', 'driver'],
    });
    const offers = await this.promotionRepository.find({
      where: { vendorId: id },
    });
    return { ...vendor, bookings, offers };
  }

  async updateCabVendorVerification(id: string, isVerified: boolean) {
    const vendor = await this.cabVendorRepository.findOne({ where: { id } });
    if (!vendor) throw new NotFoundException('Vendor not found');
    vendor.isVerified = isVerified;
    return this.cabVendorRepository.save(vendor);
  }

  async addCabVehicle(vendorId: string, data: any) {
    const vehicle = this.vehicleRepository.create({ ...data, vendorId });
    return this.vehicleRepository.save(vehicle);
  }

  async deleteCabVehicle(id: string) {
    return this.vehicleRepository.delete(id);
  }

  async findAllBookings() {
    const hotelBookings = await this.bookingRepository.find({
      where: { tourPartnerId: IsNull() },
      relations: ['hotel'],
    });
    const packageBookings = await this.bookingRepository.find({
      where: { hotelId: IsNull() },
      relations: [],
    });
    const busBookings = await this.busBookingRepository.find({
      relations: ['schedule', 'schedule.bus'],
    });
    const cabBookings = await this.cabBookingRepository.find({
      relations: ['vendor', 'vehicle'],
    });

    const unified = [
      ...hotelBookings.map((b) => ({
        ...b,
        vertical: 'HOTEL',
        amount: b.totalAmount,
        guestName: b.guestName,
      })),
      ...packageBookings.map((b) => ({
        ...b,
        vertical: 'PACKAGE',
        amount: b.totalAmount,
        guestName: b.guestName,
      })),
      ...busBookings.map((b) => ({
        ...b,
        vertical: 'BUS',
        amount: b.totalFare,
        guestName: b.passengerDetails?.[0]?.name,
      })),
      ...cabBookings.map((b) => ({
        ...b,
        vertical: 'CAB',
        amount: b.totalAmount,
        guestName: b.customerName,
      })),
    ];
    return unified.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  async findAllUsers() {
    return this.staffRepository.find({
      relations: ['hotel', 'tourPartner', 'busVendor', 'cabVendor'],
      order: { createdAt: 'DESC' },
    });
  }
}
