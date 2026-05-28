import { CabVendor } from './cab-vendor.entity';
export declare enum VehicleCategory {
    HATCHBACK = "HATCHBACK",
    SEDAN = "SEDAN",
    SUV = "SUV",
    PREMIUM_SUV = "PREMIUM_SUV",
    LUXURY = "LUXURY",
    TEMPO_TRAVELLER = "TEMPO_TRAVELLER"
}
export declare class Vehicle {
    id: string;
    registrationNumber: string;
    make: string;
    model: string;
    year: number;
    category: VehicleCategory;
    seatingCapacity: number;
    hasAC: boolean;
    rcDocumentUrl: string;
    insuranceDocumentUrl: string;
    permitDocumentUrl: string;
    verificationStatus: string;
    isActive: boolean;
    vendorId: string;
    vendor: CabVendor;
    createdAt: Date;
    updatedAt: Date;
}
