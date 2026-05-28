import { Repository } from 'typeorm';
import { BusVendor } from './entities/bus-vendor.entity';
import { Bus } from './entities/bus.entity';
import { BusRoute } from './entities/bus-route.entity';
import { BusSchedule } from './entities/bus-schedule.entity';
import { SeatLayout } from './entities/seat-layout.entity';
import { Crew } from './entities/crew.entity';
import { BusBooking } from './entities/bus-booking.entity';
import { YieldRule } from './entities/yield-rule.entity';
export declare class BusesService {
    private vendorRepo;
    private busRepo;
    private routeRepo;
    private scheduleRepo;
    private layoutRepo;
    private crewRepo;
    private bookingRepo;
    private yieldRuleRepo;
    constructor(vendorRepo: Repository<BusVendor>, busRepo: Repository<Bus>, routeRepo: Repository<BusRoute>, scheduleRepo: Repository<BusSchedule>, layoutRepo: Repository<SeatLayout>, crewRepo: Repository<Crew>, bookingRepo: Repository<BusBooking>, yieldRuleRepo: Repository<YieldRule>);
    findAllVendors(): Promise<BusVendor[]>;
    findVendorById(id: string): Promise<BusVendor>;
    createVendor(data: Partial<BusVendor>): Promise<BusVendor>;
    updateVendor(id: string, data: Partial<BusVendor>): Promise<BusVendor>;
    findBusesByVendor(vendorId: string): Promise<Bus[]>;
    createBus(data: Partial<Bus>): Promise<Bus>;
    findAllRoutes(): Promise<BusRoute[]>;
    createRoute(data: Partial<BusRoute>): Promise<BusRoute>;
    findSchedulesByRoute(routeId: string): Promise<BusSchedule[]>;
    createSchedule(data: Partial<BusSchedule>): Promise<BusSchedule>;
    findSeatLayout(busId: string): Promise<SeatLayout[]>;
    saveSeatLayout(busId: string, layouts: Partial<SeatLayout>[]): Promise<SeatLayout[]>;
    findCrewByVendor(vendorId: string): Promise<Crew[]>;
    createCrewMember(data: Partial<Crew>): Promise<Crew>;
    findBookingsBySchedule(scheduleId: string): Promise<BusBooking[]>;
    createBooking(data: Partial<BusBooking>): Promise<BusBooking>;
    findYieldRulesByBus(busId: string): Promise<YieldRule[]>;
    createYieldRule(busId: string, data: Partial<YieldRule>): Promise<YieldRule>;
    getStats(vendorId: string): Promise<{
        totalBuses: number;
        totalRoutes: number;
        totalRevenue: number;
        totalTickets: number;
        activeTrips: number;
    }>;
    searchPublicBuses(query: {
        origin: string;
        destination: string;
        date: string;
    }): Promise<BusSchedule[]>;
    getSeatMatrix(scheduleId: string): Promise<{
        layout: SeatLayout[];
        lockedSeats: string[];
        schedule: BusSchedule;
    }>;
    lockSeats(data: any): Promise<BusBooking[]>;
    cleanupExpiredPendingBookings(): Promise<void>;
}
