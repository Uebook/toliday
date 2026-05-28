import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusVendor } from './entities/bus-vendor.entity';
import { Bus } from './entities/bus.entity';
import { BusRoute } from './entities/bus-route.entity';
import { BusSchedule } from './entities/bus-schedule.entity';
import { SeatLayout } from './entities/seat-layout.entity';
import { Crew } from './entities/crew.entity';
import { BusBooking, BookingStatus } from './entities/bus-booking.entity';
import { YieldRule } from './entities/yield-rule.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

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
    const vendor = await this.vendorRepo.findOne({
      where: { id },
      relations: ['staffs', 'buses'],
    });
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
    return this.busRepo.find({
      where: { vendorId },
      relations: ['seatLayouts'],
    });
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
    return this.scheduleRepo.find({
      where: { routeId },
      relations: ['bus', 'driver', 'conductor'],
    });
  }

  async createSchedule(data: Partial<BusSchedule>) {
    const schedule = this.scheduleRepo.create(data);
    return this.scheduleRepo.save(schedule);
  }

  // Seat Layout Methods
  async findSeatLayout(busId: string) {
    return this.layoutRepo.find({
      where: { busId },
      order: { deck: 'ASC', row: 'ASC', column: 'ASC' },
    });
  }

  async saveSeatLayout(busId: string, layouts: Partial<SeatLayout>[]) {
    await this.layoutRepo.delete({ busId });
    const entities = layouts.map((l) =>
      this.layoutRepo.create({ ...l, busId }),
    );
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

    const bookings = await this.bookingRepo
      .createQueryBuilder('booking')
      .innerJoinAndSelect('booking.schedule', 'schedule')
      .innerJoinAndSelect('schedule.bus', 'bus')
      .where('bus.vendorId = :vendorId', { vendorId })
      .getMany();

    const totalRevenue = bookings.reduce(
      (sum, b) => sum + (Number(b.totalFare) || 0),
      0,
    );
    const totalTickets = bookings.length;

    return {
      totalBuses,
      totalRoutes,
      totalRevenue,
      totalTickets,
      activeTrips: 5, // Mock for now or calculate from schedules
    };
  }

  // PUBLIC APIs (B2C)
  async searchPublicBuses(query: { origin: string; destination: string; date: string }) {
    const qb = this.scheduleRepo.createQueryBuilder('schedule')
      .innerJoinAndSelect('schedule.route', 'route')
      .innerJoinAndSelect('schedule.bus', 'bus')
      .where('route.originCity ILIKE :origin', { origin: `%${query.origin}%` })
      .andWhere('route.destinationCity ILIKE :dest', { dest: `%${query.destination}%` })
      .andWhere('schedule.status = :status', { status: 'SCHEDULED' });
      
    if (query.date) {
      qb.andWhere('schedule.departureDate = :date', { date: query.date });
    }
    
    return qb.getMany();
  }

  async getSeatMatrix(scheduleId: string) {
    const schedule = await this.scheduleRepo.findOne({
      where: { id: scheduleId },
      relations: ['bus', 'bus.seatLayouts']
    });
    
    if (!schedule) throw new NotFoundException('Schedule not found');
    
    // Get all bookings (PENDING & CONFIRMED) to find locked/booked seats
    const activeBookings = await this.bookingRepo.find({
      where: [
        { scheduleId, status: BookingStatus.CONFIRMED },
        { scheduleId, status: BookingStatus.PENDING }
      ]
    });
    
    const lockedSeats = activeBookings.flatMap(b => b.selectedSeats);
    
    return {
      layout: schedule.bus.seatLayouts,
      lockedSeats,
      schedule
    };
  }

  async lockSeats(data: any) {
    // Check if seats are already locked
    const matrix = await this.getSeatMatrix(data.scheduleId);
    const requestedSeats: string[] = data.selectedSeats;
    
    const conflict = requestedSeats.some(seat => matrix.lockedSeats.includes(seat));
    if (conflict) {
      throw new Error('Some of the selected seats have just been booked by another user.');
    }
    
    const booking = this.bookingRepo.create({
      ...data,
      pnr: `PNR${Date.now().toString().substring(4)}`,
      status: BookingStatus.PENDING,
    });
    
    return this.bookingRepo.save(booking);
  }

  // Auto-Release 10-Minute Seat Locks
  @Cron(CronExpression.EVERY_MINUTE)
  async cleanupExpiredPendingBookings() {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const expiredBookings = await this.bookingRepo.find({
      where: {
        status: BookingStatus.PENDING,
      },
    });

    const strictlyExpired = expiredBookings.filter(b => b.createdAt < tenMinutesAgo);

    for (const booking of strictlyExpired) {
      booking.status = BookingStatus.CANCELLED;
      await this.bookingRepo.save(booking);
      console.log(`[Bus System] Released locked seats for expired booking: ${booking.id}`);
    }
  }
}
