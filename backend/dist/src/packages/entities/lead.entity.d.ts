import { TourPartner } from './tour-partner.entity';
import { TourPackage } from './tour-package.entity';
export declare enum LeadStatus {
    NEW = "NEW",
    HOT = "HOT",
    WARM = "WARM",
    COLD = "COLD",
    CONVERTED = "CONVERTED",
    LOST = "LOST"
}
export declare class Lead {
    id: string;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    paxCount: number;
    preferredDate: string;
    notes: string;
    status: LeadStatus;
    packageId: string;
    package: TourPackage;
    partnerId: string;
    partner: TourPartner;
    nextFollowUp: string;
    createdAt: Date;
    updatedAt: Date;
}
