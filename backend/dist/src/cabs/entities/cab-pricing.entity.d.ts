import { CabVendor } from './cab-vendor.entity';
import { VehicleCategory } from './vehicle.entity';
export declare enum PricingModel {
    OUTSTATION = "OUTSTATION",
    LOCAL_RENTAL = "LOCAL_RENTAL",
    AIRPORT_TRANSFER = "AIRPORT_TRANSFER"
}
export declare class CabPricing {
    id: string;
    model: PricingModel;
    category: VehicleCategory;
    perKmRate: number;
    driverAllowancePerDay: number;
    minKmPerDay: number;
    packageHours: number;
    packageKms: number;
    basePackageRate: number;
    extraHourRate: number;
    extraKmRate: number;
    pickupLocation: string;
    dropLocation: string;
    flatRate: number;
    isActive: boolean;
    vendorId: string;
    vendor: CabVendor;
    createdAt: Date;
    updatedAt: Date;
}
