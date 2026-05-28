import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CabVendor } from './entities/cab-vendor.entity';
import { Vehicle } from './entities/vehicle.entity';
import { Driver } from './entities/driver.entity';
import { CabPricing } from './entities/cab-pricing.entity';
import { CabBooking, CabBookingStatus } from './entities/cab-booking.entity';

@Injectable()
export class CabsService {
  constructor(
    @InjectRepository(CabVendor)
    private vendorRepo: Repository<CabVendor>,
    @InjectRepository(Vehicle)
    private vehicleRepo: Repository<Vehicle>,
    @InjectRepository(Driver)
    private driverRepo: Repository<Driver>,
    @InjectRepository(CabPricing)
    private pricingRepo: Repository<CabPricing>,
    @InjectRepository(CabBooking)
    private bookingRepo: Repository<CabBooking>,
  ) {}

  // Vendor
  async findVendorById(id: string) {
    const vendor = await this.vendorRepo.findOne({ where: { id } });
    if (!vendor) throw new NotFoundException('Vendor not found');
    return vendor;
  }

  async updateVendor(id: string, data: Partial<CabVendor>) {
    await this.vendorRepo.update(id, data);
    return this.findVendorById(id);
  }

  // Fleet (Vehicles)
  async findVehicles(vendorId: string) {
    return this.vehicleRepo.find({
      where: { vendorId },
      order: { createdAt: 'DESC' },
    });
  }

  async createVehicle(vendorId: string, data: Partial<Vehicle>) {
    const vehicle = this.vehicleRepo.create({ ...data, vendorId });
    return this.vehicleRepo.save(vehicle);
  }

  async updateVehicle(id: string, vendorId: string, data: Partial<Vehicle>) {
    await this.vehicleRepo.update({ id, vendorId }, data);
    return this.vehicleRepo.findOne({ where: { id } });
  }

  async deleteVehicle(id: string, vendorId: string) {
    return this.vehicleRepo.delete({ id, vendorId });
  }

  // Drivers
  async findDrivers(vendorId: string) {
    return this.driverRepo.find({
      where: { vendorId },
      order: { createdAt: 'DESC' },
    });
  }

  async createDriver(vendorId: string, data: Partial<Driver>) {
    const driver = this.driverRepo.create({ ...data, vendorId });
    return this.driverRepo.save(driver);
  }

  async updateDriver(id: string, vendorId: string, data: Partial<Driver>) {
    await this.driverRepo.update({ id, vendorId }, data);
    return this.driverRepo.findOne({ where: { id } });
  }

  async deleteDriver(id: string, vendorId: string) {
    return this.driverRepo.delete({ id, vendorId });
  }

  // Pricing
  async findPricing(vendorId: string) {
    return this.pricingRepo.find({
      where: { vendorId },
      order: { createdAt: 'DESC' },
    });
  }

  async createPricing(vendorId: string, data: Partial<CabPricing>) {
    const pricing = this.pricingRepo.create({ ...data, vendorId });
    return this.pricingRepo.save(pricing);
  }

  async deletePricing(id: string, vendorId: string) {
    return this.pricingRepo.delete({ id, vendorId });
  }

  // Bookings
  async findBookings(vendorId: string) {
    return this.bookingRepo.find({
      where: { vendorId },
      relations: ['vehicle', 'driver'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateBookingStatus(
    id: string,
    vendorId: string,
    status: CabBookingStatus,
  ) {
    await this.bookingRepo.update({ id, vendorId }, { status });
    return this.bookingRepo.findOne({ where: { id } });
  }

  // Stats for Dashboard
  async getStats(vendorId: string) {
    const totalBookings = await this.bookingRepo.count({ where: { vendorId } });
    const activeBookings = await this.bookingRepo.count({
      where: { vendorId, status: CabBookingStatus.CONFIRMED },
    });
    const completedBookings = await this.bookingRepo.count({
      where: { vendorId, status: CabBookingStatus.COMPLETED },
    });

    const revenueResult = await this.bookingRepo
      .createQueryBuilder('booking')
      .select('SUM(booking.totalAmount)', 'total')
      .where('booking.vendorId = :vendorId', { vendorId })
      .andWhere('booking.status = :status', {
        status: CabBookingStatus.COMPLETED,
      })
      .getRawOne();

    const totalVehicles = await this.vehicleRepo.count({ where: { vendorId } });
    const totalDrivers = await this.driverRepo.count({ where: { vendorId } });

    return {
      totalBookings,
      activeBookings,
      completedBookings,
      totalRevenue: parseFloat(revenueResult?.total || '0'),
      totalVehicles,
      totalDrivers,
    };
  }
}
