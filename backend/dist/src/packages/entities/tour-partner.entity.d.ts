import { Staff } from '../../staff/entities/staff.entity';
import { Tour } from './tour.entity';
import { TourPackage } from './tour-package.entity';
import { Lead } from './lead.entity';
export declare enum PartnerStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    BLOCKED = "BLOCKED"
}
export declare class TourPartner {
    id: string;
    name: string;
    businessName: string;
    businessType: string;
    website: string;
    yearsInOperation: string;
    city: string;
    operatingArea: string;
    address: string;
    email: string;
    contactNumber: string;
    gstNumber: string;
    panNumber: string;
    registrationNumber: string;
    gstDoc: string;
    panDoc: string;
    licenseDoc: string;
    chequeDoc: string;
    bankHolder: string;
    bankName: string;
    bankAccount: string;
    bankIfsc: string;
    isVerified: boolean;
    status: PartnerStatus;
    staffs: Staff[];
    leads: Lead[];
    tours: Tour[];
    packages: TourPackage[];
    createdAt: Date;
    updatedAt: Date;
}
