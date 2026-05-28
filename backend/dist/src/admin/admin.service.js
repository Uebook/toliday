"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hotel_entity_1 = require("../hotel/entities/hotel.entity");
const tour_partner_entity_1 = require("../packages/entities/tour-partner.entity");
const bus_vendor_entity_1 = require("../buses/entities/bus-vendor.entity");
const cab_vendor_entity_1 = require("../cabs/entities/cab-vendor.entity");
const booking_entity_1 = require("../booking/entities/booking.entity");
const bus_booking_entity_1 = require("../buses/entities/bus-booking.entity");
const cab_booking_entity_1 = require("../cabs/entities/cab-booking.entity");
const staff_entity_1 = require("../staff/entities/staff.entity");
const promotion_entity_1 = require("../promotions/entities/promotion.entity");
const room_type_entity_1 = require("../room-type/entities/room-type.entity");
const tour_package_entity_1 = require("../packages/entities/tour-package.entity");
const bus_entity_1 = require("../buses/entities/bus.entity");
const vehicle_entity_1 = require("../cabs/entities/vehicle.entity");
const global_setting_entity_1 = require("../settings/entities/global-setting.entity");
const ledger_entry_entity_1 = require("../finance/entities/ledger-entry.entity");
let AdminService = class AdminService {
    hotelRepository;
    tourPartnerRepository;
    busVendorRepository;
    cabVendorRepository;
    bookingRepository;
    busBookingRepository;
    cabBookingRepository;
    staffRepository;
    promotionRepository;
    roomTypeRepository;
    tourPackageRepository;
    busRepository;
    vehicleRepository;
    settingsRepository;
    ledgerRepository;
    constructor(hotelRepository, tourPartnerRepository, busVendorRepository, cabVendorRepository, bookingRepository, busBookingRepository, cabBookingRepository, staffRepository, promotionRepository, roomTypeRepository, tourPackageRepository, busRepository, vehicleRepository, settingsRepository, ledgerRepository) {
        this.hotelRepository = hotelRepository;
        this.tourPartnerRepository = tourPartnerRepository;
        this.busVendorRepository = busVendorRepository;
        this.cabVendorRepository = cabVendorRepository;
        this.bookingRepository = bookingRepository;
        this.busBookingRepository = busBookingRepository;
        this.cabBookingRepository = cabBookingRepository;
        this.staffRepository = staffRepository;
        this.promotionRepository = promotionRepository;
        this.roomTypeRepository = roomTypeRepository;
        this.tourPackageRepository = tourPackageRepository;
        this.busRepository = busRepository;
        this.vehicleRepository = vehicleRepository;
        this.settingsRepository = settingsRepository;
        this.ledgerRepository = ledgerRepository;
    }
    async processSettlements() {
        const settings = await this.settingsRepository.find();
        const getRate = (key) => parseFloat(settings.find((s) => s.key === key)?.value || '0') / 100;
        const rates = {
            HOTEL: getRate('COMMISSION_HOTEL'),
            PACKAGE: getRate('COMMISSION_PACKAGE'),
            BUS: getRate('COMMISSION_BUS'),
            CAB: getRate('COMMISSION_CAB'),
        };
        let processedCount = 0;
        let totalVolume = 0;
        const hotelBookings = await this.bookingRepository.find({
            where: { status: booking_entity_1.BookingStatus.COMPLETED, isSettled: false },
        });
        for (const b of hotelBookings) {
            const vertical = b.hotelId ? ledger_entry_entity_1.VerticalType.HOTEL : ledger_entry_entity_1.VerticalType.PACKAGE;
            const rate = rates[vertical];
            const commission = Number(b.totalAmount) * rate;
            const net = Number(b.totalAmount) - commission;
            b.commissionAmount = commission;
            b.netAmount = net;
            b.isSettled = true;
            await this.bookingRepository.save(b);
            await this.createLedgerEntry(b.hotelId || b.tourPartnerId, vertical, net, `Settlement for Booking #${b.bookingReference}`, b.id);
            processedCount++;
            totalVolume += net;
        }
        const busBookings = await this.busBookingRepository
            .createQueryBuilder('bb')
            .leftJoinAndSelect('bb.schedule', 's')
            .leftJoinAndSelect('s.bus', 'b')
            .where('bb.status = :status', { status: 'CONFIRMED' })
            .andWhere('bb.isSettled = :settled', { settled: false })
            .getMany();
        for (const b of busBookings) {
            const rate = rates[ledger_entry_entity_1.VerticalType.BUS];
            const commission = Number(b.totalFare) * rate;
            const net = Number(b.totalFare) - commission;
            b.commissionAmount = commission;
            b.netAmount = net;
            b.isSettled = true;
            await this.busBookingRepository.save(b);
            await this.createLedgerEntry(b.schedule.bus.vendorId, ledger_entry_entity_1.VerticalType.BUS, net, `Settlement for Bus PNR ${b.pnr}`, b.id);
            processedCount++;
            totalVolume += net;
        }
        const cabBookings = await this.cabBookingRepository.find({
            where: { status: cab_booking_entity_1.CabBookingStatus.COMPLETED, isSettled: false },
        });
        for (const b of cabBookings) {
            const rate = rates[ledger_entry_entity_1.VerticalType.CAB];
            const commission = Number(b.totalAmount) * rate;
            const net = Number(b.totalAmount) - commission;
            b.commissionAmount = commission;
            b.netAmount = net;
            b.isSettled = true;
            await this.cabBookingRepository.save(b);
            await this.createLedgerEntry(b.vendorId, ledger_entry_entity_1.VerticalType.CAB, net, `Settlement for Cab Booking ${b.bookingId}`, b.id);
            processedCount++;
            totalVolume += net;
        }
        return { processedCount, totalVolume };
    }
    async createLedgerEntry(vendorId, vertical, amount, description, referenceId) {
        const entry = this.ledgerRepository.create({
            vendorId,
            vertical,
            amount,
            description,
            referenceId,
            type: ledger_entry_entity_1.LedgerEntryType.CREDIT,
        });
        return this.ledgerRepository.save(entry);
    }
    async updatePromotionStatus(id, isVerified) {
        const promo = await this.promotionRepository.findOne({ where: { id } });
        if (!promo)
            throw new common_1.NotFoundException('Promotion not found');
        promo.isVerified = isVerified;
        return this.promotionRepository.save(promo);
    }
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
    async findAllHotels(status) {
        const where = status ? { status } : {};
        return this.hotelRepository.find({
            where,
            order: { createdAt: 'DESC' },
        });
    }
    async findHotelById(id) {
        const hotel = await this.hotelRepository.findOne({
            where: { id },
            relations: ['staffs', 'roomTypes', 'bookings'],
        });
        if (!hotel)
            throw new common_1.NotFoundException('Hotel not found');
        const offers = await this.promotionRepository.find({
            where: { vendorId: id },
        });
        return { ...hotel, offers };
    }
    async updateHotelStatus(id, status) {
        const hotel = await this.hotelRepository.findOne({ where: { id } });
        if (!hotel)
            throw new common_1.NotFoundException('Hotel not found');
        hotel.status = status;
        if (status === hotel_entity_1.HotelStatus.APPROVED)
            hotel.isVerified = true;
        return this.hotelRepository.save(hotel);
    }
    async addHotelRoom(hotelId, data) {
        const room = this.roomTypeRepository.create({ ...data, hotelId });
        return this.roomTypeRepository.save(room);
    }
    async deleteHotelRoom(id) {
        return this.roomTypeRepository.delete(id);
    }
    async findAllTourPartners(status) {
        const where = status ? { status } : {};
        return this.tourPartnerRepository.find({
            where,
            order: { createdAt: 'DESC' },
        });
    }
    async findTourPartnerById(id) {
        const partner = await this.tourPartnerRepository.findOne({
            where: { id },
            relations: ['staffs', 'packages', 'bookings'],
        });
        if (!partner)
            throw new common_1.NotFoundException('Tour partner not found');
        const offers = await this.promotionRepository.find({
            where: { vendorId: id },
        });
        return { ...partner, offers };
    }
    async updateTourPartnerStatus(id, status) {
        const partner = await this.tourPartnerRepository.findOne({ where: { id } });
        if (!partner)
            throw new common_1.NotFoundException('Partner not found');
        partner.status = status;
        if (status === tour_partner_entity_1.PartnerStatus.APPROVED)
            partner.isVerified = true;
        return this.tourPartnerRepository.save(partner);
    }
    async addTourPackage(partnerId, data) {
        const pkg = this.tourPackageRepository.create({
            ...data,
            partnerId,
            status: tour_package_entity_1.PackageStatus.ACTIVE,
        });
        return this.tourPackageRepository.save(pkg);
    }
    async deleteTourPackage(id) {
        return this.tourPackageRepository.delete(id);
    }
    async findAllBusVendors(status) {
        const where = status ? { status } : {};
        return this.busVendorRepository.find({
            where,
            order: { createdAt: 'DESC' },
            relations: ['buses'],
        });
    }
    async findBusVendorById(id) {
        const vendor = await this.busVendorRepository.findOne({
            where: { id },
            relations: ['staffs', 'buses'],
        });
        if (!vendor)
            throw new common_1.NotFoundException('Bus vendor not found');
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
    async updateBusVendorStatus(id, status) {
        const vendor = await this.busVendorRepository.findOne({ where: { id } });
        if (!vendor)
            throw new common_1.NotFoundException('Vendor not found');
        vendor.status = status;
        if (status === bus_vendor_entity_1.BusVendorStatus.APPROVED)
            vendor.isVerified = true;
        return this.busVendorRepository.save(vendor);
    }
    async addBusFleet(vendorId, data) {
        const bus = this.busRepository.create({ ...data, vendorId });
        return this.busRepository.save(bus);
    }
    async deleteBusFleet(id) {
        return this.busRepository.delete(id);
    }
    async findAllCabVendors() {
        return this.cabVendorRepository.find({
            order: { createdAt: 'DESC' },
            relations: ['vehicles', 'drivers'],
        });
    }
    async findCabVendorById(id) {
        const vendor = await this.cabVendorRepository.findOne({
            where: { id },
            relations: ['vehicles', 'drivers'],
        });
        if (!vendor)
            throw new common_1.NotFoundException('Cab vendor not found');
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
    async updateCabVendorVerification(id, isVerified) {
        const vendor = await this.cabVendorRepository.findOne({ where: { id } });
        if (!vendor)
            throw new common_1.NotFoundException('Vendor not found');
        vendor.isVerified = isVerified;
        return this.cabVendorRepository.save(vendor);
    }
    async addCabVehicle(vendorId, data) {
        const vehicle = this.vehicleRepository.create({ ...data, vendorId });
        return this.vehicleRepository.save(vehicle);
    }
    async deleteCabVehicle(id) {
        return this.vehicleRepository.delete(id);
    }
    async findAllBookings() {
        const hotelBookings = await this.bookingRepository.find({
            where: { tourPartnerId: (0, typeorm_2.IsNull)() },
            relations: ['hotel'],
        });
        const packageBookings = await this.bookingRepository.find({
            where: { hotelId: (0, typeorm_2.IsNull)() },
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
        return unified.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    async findAllUsers() {
        return this.staffRepository.find({
            relations: ['hotel', 'tourPartner', 'busVendor', 'cabVendor'],
            order: { createdAt: 'DESC' },
        });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hotel_entity_1.Hotel)),
    __param(1, (0, typeorm_1.InjectRepository)(tour_partner_entity_1.TourPartner)),
    __param(2, (0, typeorm_1.InjectRepository)(bus_vendor_entity_1.BusVendor)),
    __param(3, (0, typeorm_1.InjectRepository)(cab_vendor_entity_1.CabVendor)),
    __param(4, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __param(5, (0, typeorm_1.InjectRepository)(bus_booking_entity_1.BusBooking)),
    __param(6, (0, typeorm_1.InjectRepository)(cab_booking_entity_1.CabBooking)),
    __param(7, (0, typeorm_1.InjectRepository)(staff_entity_1.Staff)),
    __param(8, (0, typeorm_1.InjectRepository)(promotion_entity_1.Promotion)),
    __param(9, (0, typeorm_1.InjectRepository)(room_type_entity_1.RoomType)),
    __param(10, (0, typeorm_1.InjectRepository)(tour_package_entity_1.TourPackage)),
    __param(11, (0, typeorm_1.InjectRepository)(bus_entity_1.Bus)),
    __param(12, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __param(13, (0, typeorm_1.InjectRepository)(global_setting_entity_1.GlobalSetting)),
    __param(14, (0, typeorm_1.InjectRepository)(ledger_entry_entity_1.LedgerEntry)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map