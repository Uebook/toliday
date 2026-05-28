import { BusesService } from './buses.service';
export declare class BusesController {
    private readonly busesService;
    constructor(busesService: BusesService);
    getStats(req: any): Promise<{
        totalBuses: number;
        totalRoutes: number;
        totalRevenue: number;
        totalTickets: number;
        activeTrips: number;
    }>;
    getProfile(req: any): Promise<import("./entities/bus-vendor.entity").BusVendor>;
    updateProfile(req: any, data: any): Promise<import("./entities/bus-vendor.entity").BusVendor>;
    findAllVendors(): Promise<import("./entities/bus-vendor.entity").BusVendor[]>;
    findVendorById(id: string): Promise<import("./entities/bus-vendor.entity").BusVendor>;
    createVendor(data: any): Promise<import("./entities/bus-vendor.entity").BusVendor>;
    findBusesByVendor(vendorId: string): Promise<import("./entities/bus.entity").Bus[]>;
    createBus(data: any): Promise<import("./entities/bus.entity").Bus>;
    findAllRoutes(): Promise<import("./entities/bus-route.entity").BusRoute[]>;
    createRoute(data: any): Promise<import("./entities/bus-route.entity").BusRoute>;
    findSchedulesByRoute(routeId: string): Promise<import("./entities/bus-schedule.entity").BusSchedule[]>;
    createSchedule(data: any): Promise<import("./entities/bus-schedule.entity").BusSchedule>;
    findSeatLayout(busId: string): Promise<import("./entities/seat-layout.entity").SeatLayout[]>;
    saveSeatLayout(busId: string, layouts: any[]): Promise<import("./entities/seat-layout.entity").SeatLayout[]>;
    findCrewByVendor(vendorId: string): Promise<import("./entities/crew.entity").Crew[]>;
    createCrewMember(data: any): Promise<import("./entities/crew.entity").Crew>;
    findBookingsBySchedule(scheduleId: string): Promise<import("./entities/bus-booking.entity").BusBooking[]>;
    createBooking(data: any): Promise<import("./entities/bus-booking.entity").BusBooking>;
    findYieldRules(busId: string): Promise<import("./entities/yield-rule.entity").YieldRule[]>;
    createYieldRule(busId: string, data: any): Promise<import("./entities/yield-rule.entity").YieldRule>;
}
