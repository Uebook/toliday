import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusVendor } from './entities/bus-vendor.entity';
import { Bus } from './entities/bus.entity';
import { BusRoute } from './entities/bus-route.entity';
import { BusSchedule } from './entities/bus-schedule.entity';
import { SeatLayout } from './entities/seat-layout.entity';
import { Crew } from './entities/crew.entity';
import { BusBooking } from './entities/bus-booking.entity';
import { YieldRule } from './entities/yield-rule.entity';

@Injectable()
export class BusesService {
  constructor(
    @InjectRepository(BusVendor)
    private vendorRepo: Repository<BusVendor>,
    @InjectRepository(Bus)
    private busRepo: Repository<Bus>,
    @InjectRepository(BusRoute)
    private routeRepo: Repository<BusRoute>,
    @InjectRepository(BusSchedule)
    private scheduleRepo: Repository<BusSchedule>,
    @InjectRepository(SeatLayout)
    private layoutRepo: Repository<SeatLayout>,
    @InjectRepository(Crew)
    private crewRepo: Repository<Crew>,
    @InjectRepository(BusBooking)
    private bookingRepo: Repository<BusBooking>,
    @InjectRepository(YieldRule)
    private yieldRuleRepo: Repository<YieldRule>,
  ) {}

  // Vendor Methods
  async findAllVendors() {
    return this.vendorRepo.find();
  }

  async findVendorById(id: string) {
    const vendor = await this.vendorRepo.findOne({ where: { id }, relations: ['staffs', 'buses'] });
    if (!vendor) throw new NotFoundException('Vendor not found');
    return vendor;
  }

  async createVendor(data: Partial<BusVendor>) {
    const vendor = this.vendorRepo.create(data);
    return this.vendorRepo.save(vendor);
  }

  async updateVendor(id: string, data: Partial<BusVendor>) {
    await this.vendorRepo.update(id, data);
    return this.findVendorById(id);
  }

  // Bus Methods
  async findBusesByVendor(vendorId: string) {
    return this.busRepo.find({ where: { vendorId }, relations: ['seatLayouts'] });
  }

  async createBus(data: Partial<Bus>) {
    const bus = this.busRepo.create(data);
    return this.busRepo.save(bus);
  }

  // Route Methods
  async findAllRoutes() {
    return this.routeRepo.find();
  }

  async createRoute(data: Partial<BusRoute>) {
    const route = this.routeRepo.create(data);
    return this.routeRepo.save(route);
  }

  // Schedule Methods
  async findSchedulesByRoute(routeId: string) {
    return this.scheduleRepo.find({ where: { routeId }, relations: ['bus', 'driver', 'conductor'] });
  }

  async createSchedule(data: Partial<BusSchedule>) {
    const schedule = this.scheduleRepo.create(data);
    return this.scheduleRepo.save(schedule);
  }

  // Seat Layout Methods
  async findSeatLayout(busId: string) {
    return this.layoutRepo.find({ where: { busId }, order: { deck: 'ASC', row: 'ASC', column: 'ASC' } });
  }

  async saveSeatLayout(busId: string, layouts: Partial<SeatLayout>[]) {
    await this.layoutRepo.delete({ busId });
    const entities = layouts.map(l => this.layoutRepo.create({ ...l, busId }));
    return this.layoutRepo.save(entities);
  }

  // Crew Methods
  async findCrewByVendor(vendorId: string) {
    return this.crewRepo.find({ where: { vendorId } });
  }

  async createCrewMember(data: Partial<Crew>) {
    const crew = this.crewRepo.create(data);
    return this.crewRepo.save(crew);
  }

  // Booking Methods
  async findBookingsBySchedule(scheduleId: string) {
    return this.bookingRepo.find({ where: { scheduleId } });
  }

  async createBooking(data: Partial<BusBooking>) {
    const booking = this.bookingRepo.create(data);
    return this.bookingRepo.save(booking);
  }

  // Yield Management Methods
  async findYieldRulesByBus(busId: string) {
    return this.yieldRuleRepo.find({ where: { busId } });
  }

  async createYieldRule(busId: string, data: Partial<YieldRule>) {
    const rule = this.yieldRuleRepo.create({ ...data, busId });
    return this.yieldRuleRepo.save(rule);
  }

  // Dashboard Stats
  async getStats(vendorId: string) {
    const totalBuses = await this.busRepo.count({ where: { vendorId } });
    const totalRoutes = await this.routeRepo.count();
    
    const bookings = await this.bookingRepo.createQueryBuilder('booking')
      .innerJoinAndSelect('booking.schedule', 'schedule')
      .innerJoinAndSelect('schedule.bus', 'bus')
      .where('bus.vendorId = :vendorId', { vendorId })
      .getMany();

    const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.totalFare) || 0), 0);
    const totalTickets = bookings.length;

    return {
      totalBuses,
      totalRoutes,
      totalRevenue,
      totalTickets,
      activeTrips: 5, // Mock for now or calculate from schedules
    };
  }
}
