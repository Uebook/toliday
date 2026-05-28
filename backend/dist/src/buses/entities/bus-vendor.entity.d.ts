import { Staff } from '../../staff/entities/staff.entity';
import { Bus } from './bus.entity';
export declare enum BusVendorStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    BLOCKED = "BLOCKED"
}
export declare class BusVendor {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    pinCode: string;
    contactNumber: string;
    website: string;
    email: string;
    cancellationPolicy: string;
    luggagePolicy: string;
    ownerFirstName: string;
    ownerLastName: string;
    ownerPhone: string;
    businessName: string;
    businessType: string;
    gstNumber: string;
    panNumber: string;
    gstDoc: string;
    panDoc: string;
    licenseDoc: string;
    bankHolder: string;
    bankName: string;
    bankAccount: string;
    bankIfsc: string;
    isVerified: boolean;
    apiKey: string;
    webhookUrl: string;
    commissionPercentage: number;
    gstInvoicingEnabled: boolean;
    status: BusVendorStatus;
    staffs: Staff[];
    buses: Bus[];
    createdAt: Date;
    updatedAt: Date;
}
