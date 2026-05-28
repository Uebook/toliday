import { BusVendor } from './bus-vendor.entity';
import { BusSchedule } from './bus-schedule.entity';
import { SeatLayout } from './seat-layout.entity';
import { YieldRule } from './yield-rule.entity';
export declare enum BusType {
    AC_SLEEPER = "AC_SLEEPER",
    NON_AC_SLEEPER = "NON_AC_SLEEPER",
    AC_SEATER = "AC_SEATER",
    NON_AC_SEATER = "NON_AC_SEATER",
    VOLVO_AC_SEATER = "VOLVO_AC_SEATER"
}
export declare class Bus {
    id: string;
    registrationNumber: string;
    type: BusType;
    totalSeats: number;
    amenities: string[];
    vendorId: string;
    vendor: BusVendor;
    schedules: BusSchedule[];
    seatLayouts: SeatLayout[];
    yieldRules: YieldRule[];
    gpsDeviceId: string;
    gpsProvider: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
