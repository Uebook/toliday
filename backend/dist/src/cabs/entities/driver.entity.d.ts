import { CabVendor } from './cab-vendor.entity';
export declare class Driver {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    licenseNumber: string;
    licenseExpiry: string;
    licenseDocumentUrl: string;
    aadharDocumentUrl: string;
    policeVerificationUrl: string;
    verificationStatus: string;
    isActive: boolean;
    vendorId: string;
    vendor: CabVendor;
    createdAt: Date;
    updatedAt: Date;
}
