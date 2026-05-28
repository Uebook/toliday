import { CabVendor } from './cab-vendor.entity';
import { Vehicle } from './vehicle.entity';
import { Driver } from './driver.entity';
export declare enum CabBookingStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    ONGOING = "ONGOING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare class CabBooking {
    id: string;
    bookingId: string;
    customerName: string;
    customerPhone: string;
    pickupLocation: string;
    dropLocation: string;
    pickupDateTime: Date;
    totalAmount: number;
    status: CabBookingStatus;
    vendorId: string;
    vendor: CabVendor;
    vehicleId: string;
    vehicle: Vehicle;
    driverId: string;
    driver: Driver;
    isSettled: boolean;
    commissionAmount: number;
    netAmount: number;
    createdAt: Date;
    updatedAt: Date;
}
