import { CabsService } from './cabs.service';
export declare class CabsController {
    private readonly cabsService;
    constructor(cabsService: CabsService);
    getProfile(req: any): Promise<import("./entities/cab-vendor.entity").CabVendor>;
    updateProfile(req: any, data: any): Promise<import("./entities/cab-vendor.entity").CabVendor>;
    getFleet(req: any): Promise<import("./entities/vehicle.entity").Vehicle[]>;
    createVehicle(req: any, data: any): Promise<import("./entities/vehicle.entity").Vehicle>;
    updateVehicle(req: any, id: string, data: any): Promise<import("./entities/vehicle.entity").Vehicle | null>;
    deleteVehicle(req: any, id: string): Promise<import("typeorm").DeleteResult>;
    getDrivers(req: any): Promise<import("./entities/driver.entity").Driver[]>;
    createDriver(req: any, data: any): Promise<import("./entities/driver.entity").Driver>;
    updateDriver(req: any, id: string, data: any): Promise<import("./entities/driver.entity").Driver | null>;
    deleteDriver(req: any, id: string): Promise<import("typeorm").DeleteResult>;
    getPricing(req: any): Promise<import("./entities/cab-pricing.entity").CabPricing[]>;
    createPricing(req: any, data: any): Promise<import("./entities/cab-pricing.entity").CabPricing>;
    deletePricing(req: any, id: string): Promise<import("typeorm").DeleteResult>;
    getBookings(req: any): Promise<import("./entities/cab-booking.entity").CabBooking[]>;
    updateBookingStatus(req: any, id: string, status: any): Promise<import("./entities/cab-booking.entity").CabBooking | null>;
    getStats(req: any): Promise<{
        totalBookings: number;
        activeBookings: number;
        completedBookings: number;
        totalRevenue: number;
        totalVehicles: number;
        totalDrivers: number;
    }>;
}
