import { PackagesService } from './packages.service';
export declare class PackagesController {
    private readonly packagesService;
    constructor(packagesService: PackagesService);
    getProfile(req: any): Promise<import("./entities/tour-partner.entity").TourPartner>;
    updateProfile(req: any, data: any): Promise<import("./entities/tour-partner.entity").TourPartner>;
    getAllPackages(req: any): Promise<import("./entities/tour-package.entity").TourPackage[]>;
    getPackage(req: any, id: string): Promise<import("./entities/tour-package.entity").TourPackage>;
    createPackage(req: any, data: any): Promise<import("./entities/tour-package.entity").TourPackage[]>;
    updatePackage(req: any, id: string, data: any): Promise<import("./entities/tour-package.entity").TourPackage>;
    removePackage(req: any, id: string): Promise<import("./entities/tour-package.entity").TourPackage>;
    getItineraries(req: any): Promise<import("./entities/tour-package.entity").TourPackage[]>;
    createItinerary(req: any, data: any): Promise<import("./entities/tour-package.entity").TourPackage[]>;
    getTours(req: any): Promise<import("./entities/tour.entity").Tour[]>;
    createTour(req: any, data: any): Promise<import("./entities/tour.entity").Tour[]>;
    getStatsSummary(req: any): Promise<{
        revenue: number;
        totalPackages: number;
        totalTours: number;
        totalListings: number;
        pendingBookings: number;
        activeBookings: number;
        completedBookings: number;
        recentBookings: {
            ref: string;
            customer: string;
            package: string;
            date: string;
            status: string;
            amount: string;
        }[];
    }>;
    getPaymentStats(req: any): Promise<{
        availableBalance: number;
        pendingSettlements: number;
        lastPayout: number;
        nextPayoutDate: string;
        lastPayoutDate: string;
    }>;
    getPaymentTransactions(req: any): Promise<{
        id: string;
        traveler: string;
        amount: number;
        status: string;
        method: string;
        date: Date;
    }[]>;
    getLeads(req: any): Promise<import("./entities/lead.entity").Lead[]>;
    updateLeadStatus(id: string, status: any): Promise<import("./entities/lead.entity").Lead | null>;
    getItinerary(id: string): Promise<import("./entities/itinerary-activity.entity").ItineraryActivity[]>;
    saveItinerary(id: string, activities: any[]): Promise<import("./entities/itinerary-activity.entity").ItineraryActivity[]>;
    getTiers(id: string): Promise<import("./entities/package-tier.entity").PackageTier[]>;
    saveTiers(id: string, tiers: any[]): Promise<import("./entities/package-tier.entity").PackageTier[]>;
    getDepartures(id: string): Promise<import("./entities/package-departure.entity").PackageDeparture[]>;
    saveDepartures(id: string, departures: any[]): Promise<import("./entities/package-departure.entity").PackageDeparture[]>;
}
