import { BusVendor } from './bus-vendor.entity';
import { BusSchedule } from './bus-schedule.entity';
export declare enum CrewRole {
    DRIVER = "DRIVER",
    CONDUCTOR = "CONDUCTOR"
}
export declare class Crew {
    id: string;
    name: string;
    role: CrewRole;
    phone: string;
    licenseNumber: string;
    licenseExpiry: string;
    aadharNumber: string;
    vendorId: string;
    vendor: BusVendor;
    drivenSchedules: BusSchedule[];
    conductedSchedules: BusSchedule[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
