import { Repository } from 'typeorm';
import { TourPartner } from './entities/tour-partner.entity';
import { TourPackage } from './entities/tour-package.entity';
import { Tour } from './entities/tour.entity';
import { Booking } from '../booking/entities/booking.entity';
import { Lead } from './entities/lead.entity';
import { ItineraryActivity } from './entities/itinerary-activity.entity';
import { PackageDeparture } from './entities/package-departure.entity';
import { PackageTier } from './entities/package-tier.entity';
export declare class PackagesService {
    private tourPartnerRepository;
    private tourPackageRepository;
    private tourRepository;
    private bookingRepository;
    private leadRepository;
    private activityRepository;
    private departureRepository;
    private tierRepository;
    constructor(tourPartnerRepository: Repository<TourPartner>, tourPackageRepository: Repository<TourPackage>, tourRepository: Repository<Tour>, bookingRepository: Repository<Booking>, leadRepository: Repository<Lead>, activityRepository: Repository<ItineraryActivity>, departureRepository: Repository<PackageDeparture>, tierRepository: Repository<PackageTier>);
    getProfile(id: string): Promise<TourPartner>;
    updateProfile(id: string, data: any): Promise<TourPartner>;
    getTourPackages(partnerId: string): Promise<TourPackage[]>;
    findOnePackage(id: string, partnerId: string): Promise<TourPackage>;
    createTourPackage(partnerId: string, data: any): Promise<TourPackage[]>;
    updatePackage(id: string, partnerId: string, data: any): Promise<TourPackage>;
    removePackage(id: string, partnerId: string): Promise<TourPackage>;
    getTours(partnerId: string): Promise<Tour[]>;
    createTour(partnerId: string, data: any): Promise<Tour[]>;
    getStatsSummary(partnerId: string): Promise<{
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
    getPaymentStats(partnerId: string): Promise<{
        availableBalance: number;
        pendingSettlements: number;
        lastPayout: number;
        nextPayoutDate: string;
        lastPayoutDate: string;
    }>;
    getPaymentTransactions(partnerId: string): Promise<{
        id: string;
        traveler: string;
        amount: number;
        status: string;
        method: string;
        date: Date;
    }[]>;
    getLeads(partnerId: string): Promise<Lead[]>;
    updateLeadStatus(id: string, status: any): Promise<Lead | null>;
    getItinerary(packageId: string): Promise<ItineraryActivity[]>;
    saveItinerary(packageId: string, activities: any[]): Promise<ItineraryActivity[]>;
    getTiers(packageId: string): Promise<PackageTier[]>;
    saveTiers(packageId: string, tiers: any[]): Promise<PackageTier[]>;
    getDepartures(packageId: string): Promise<PackageDeparture[]>;
    saveDepartures(packageId: string, departures: any[]): Promise<PackageDeparture[]>;
}
