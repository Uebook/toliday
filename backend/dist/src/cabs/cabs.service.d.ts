import { Repository } from 'typeorm';
import { CabVendor } from './entities/cab-vendor.entity';
import { Vehicle } from './entities/vehicle.entity';
import { Driver } from './entities/driver.entity';
import { CabPricing } from './entities/cab-pricing.entity';
import { CabBooking, CabBookingStatus } from './entities/cab-booking.entity';
export declare class CabsService {
    private vendorRepo;
    private vehicleRepo;
    private driverRepo;
    private pricingRepo;
    private bookingRepo;
    constructor(vendorRepo: Repository<CabVendor>, vehicleRepo: Repository<Vehicle>, driverRepo: Repository<Driver>, pricingRepo: Repository<CabPricing>, bookingRepo: Repository<CabBooking>);
    findVendorById(id: string): Promise<CabVendor>;
    updateVendor(id: string, data: Partial<CabVendor>): Promise<CabVendor>;
    findVehicles(vendorId: string): Promise<Vehicle[]>;
    createVehicle(vendorId: string, data: Partial<Vehicle>): Promise<Vehicle>;
    updateVehicle(id: string, vendorId: string, data: Partial<Vehicle>): Promise<Vehicle | null>;
    deleteVehicle(id: string, vendorId: string): Promise<import("typeorm").DeleteResult>;
    findDrivers(vendorId: string): Promise<Driver[]>;
    createDriver(vendorId: string, data: Partial<Driver>): Promise<Driver>;
    updateDriver(id: string, vendorId: string, data: Partial<Driver>): Promise<Driver | null>;
    deleteDriver(id: string, vendorId: string): Promise<import("typeorm").DeleteResult>;
    findPricing(vendorId: string): Promise<CabPricing[]>;
    createPricing(vendorId: string, data: Partial<CabPricing>): Promise<CabPricing>;
    deletePricing(id: string, vendorId: string): Promise<import("typeorm").DeleteResult>;
    findBookings(vendorId: string): Promise<CabBooking[]>;
    updateBookingStatus(id: string, vendorId: string, status: CabBookingStatus): Promise<CabBooking | null>;
    getStats(vendorId: string): Promise<{
        totalBookings: number;
        activeBookings: number;
        completedBookings: number;
        totalRevenue: number;
        totalVehicles: number;
        totalDrivers: number;
    }>;
}
