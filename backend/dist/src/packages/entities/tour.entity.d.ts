import { TourPartner } from './tour-partner.entity';
export declare enum TourStatus {
    ACTIVE = "ACTIVE",
    DRAFT = "DRAFT",
    INACTIVE = "INACTIVE"
}
export declare class Tour {
    id: string;
    title: string;
    description: string;
    location: string;
    duration: string;
    basePrice: number;
    maxCapacity: number;
    includes: string[];
    excludes: string[];
    itinerary: any[];
    status: TourStatus;
    partnerId: string;
    partner: TourPartner;
    createdAt: Date;
    updatedAt: Date;
}
