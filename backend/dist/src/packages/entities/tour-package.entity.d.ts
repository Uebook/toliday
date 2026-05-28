import { TourPartner } from './tour-partner.entity';
import { ItineraryActivity } from './itinerary-activity.entity';
import { Lead } from './lead.entity';
import { PackageDeparture } from './package-departure.entity';
import { PackageTier } from './package-tier.entity';
export declare enum PackageStatus {
    ACTIVE = "ACTIVE",
    DRAFT = "DRAFT",
    INACTIVE = "INACTIVE"
}
export declare class TourPackage {
    id: string;
    title: string;
    description: string;
    destinations: string[];
    duration: string;
    basePrice: number;
    salePrice: number;
    inclusions: string[];
    exclusions: string[];
    images: string[];
    itinerary: {
        day: number;
        title: string;
        description: string;
    }[];
    status: PackageStatus;
    category: string;
    partnerId: string;
    partner: TourPartner;
    structuredItinerary: ItineraryActivity[];
    leads: Lead[];
    departures: PackageDeparture[];
    pricingTiers: PackageTier[];
    createdAt: Date;
    updatedAt: Date;
}
