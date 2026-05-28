import { Vehicle } from './vehicle.entity';
import { Driver } from './driver.entity';
import { CabPricing } from './cab-pricing.entity';
export declare class CabVendor {
    id: string;
    name: string;
    email: string;
    phone: string;
    companyName: string;
    address: string;
    city: string;
    gstNumber: string;
    panNumber: string;
    isVerified: boolean;
    vehicles: Vehicle[];
    drivers: Driver[];
    pricingRules: CabPricing[];
    createdAt: Date;
    updatedAt: Date;
}
