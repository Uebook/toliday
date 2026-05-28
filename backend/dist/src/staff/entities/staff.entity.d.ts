import { Hotel } from '../../hotel/entities/hotel.entity';
import { TourPartner } from '../../packages/entities/tour-partner.entity';
import { BusVendor } from '../../buses/entities/bus-vendor.entity';
import { CabVendor } from '../../cabs/entities/cab-vendor.entity';
export declare enum StaffRole {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    RECEPTIONIST = "RECEPTIONIST"
}
export declare class Staff {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    phone: string;
    role: StaffRole;
    isActive: boolean;
    lastLogin: Date;
    permissions: Record<string, boolean>;
    twoFactorEnabled: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
    hotelId: string;
    hotel: Hotel;
    tourPartnerId: string;
    tourPartner: TourPartner;
    busVendorId: string;
    busVendor: BusVendor;
    cabVendorId: string;
    cabVendor: CabVendor;
    createdAt: Date;
    updatedAt: Date;
}
