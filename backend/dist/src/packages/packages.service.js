"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tour_partner_entity_1 = require("./entities/tour-partner.entity");
const tour_package_entity_1 = require("./entities/tour-package.entity");
const tour_entity_1 = require("./entities/tour.entity");
const booking_entity_1 = require("../booking/entities/booking.entity");
const lead_entity_1 = require("./entities/lead.entity");
const itinerary_activity_entity_1 = require("./entities/itinerary-activity.entity");
const package_departure_entity_1 = require("./entities/package-departure.entity");
const package_tier_entity_1 = require("./entities/package-tier.entity");
let PackagesService = class PackagesService {
    tourPartnerRepository;
    tourPackageRepository;
    tourRepository;
    bookingRepository;
    leadRepository;
    activityRepository;
    departureRepository;
    tierRepository;
    constructor(tourPartnerRepository, tourPackageRepository, tourRepository, bookingRepository, leadRepository, activityRepository, departureRepository, tierRepository) {
        this.tourPartnerRepository = tourPartnerRepository;
        this.tourPackageRepository = tourPackageRepository;
        this.tourRepository = tourRepository;
        this.bookingRepository = bookingRepository;
        this.leadRepository = leadRepository;
        this.activityRepository = activityRepository;
        this.departureRepository = departureRepository;
        this.tierRepository = tierRepository;
    }
    async getProfile(id) {
        const partner = await this.tourPartnerRepository.findOne({ where: { id } });
        if (!partner)
            throw new common_1.NotFoundException('Partner not found');
        return partner;
    }
    async updateProfile(id, data) {
        const partner = await this.getProfile(id);
        Object.assign(partner, data);
        return this.tourPartnerRepository.save(partner);
    }
    async getTourPackages(partnerId) {
        return this.tourPackageRepository.find({
            where: { partnerId },
            order: { createdAt: 'DESC' },
        });
    }
    async findOnePackage(id, partnerId) {
        const pkg = await this.tourPackageRepository.findOne({
            where: { id, partnerId },
        });
        if (!pkg)
            throw new common_1.NotFoundException('Package not found');
        return pkg;
    }
    async createTourPackage(partnerId, data) {
        try {
            console.log('[DEBUG] Creating Tour Package:', { partnerId, data });
            const pkg = this.tourPackageRepository.create({
                ...data,
                partnerId,
            });
            return await this.tourPackageRepository.save(pkg);
        }
        catch (err) {
            console.error('[CRITICAL] Failed to create tour package:', err.message, err.stack);
            throw err;
        }
    }
    async updatePackage(id, partnerId, data) {
        const pkg = await this.findOnePackage(id, partnerId);
        Object.assign(pkg, data);
        return this.tourPackageRepository.save(pkg);
    }
    async removePackage(id, partnerId) {
        const pkg = await this.findOnePackage(id, partnerId);
        return this.tourPackageRepository.remove(pkg);
    }
    async getTours(partnerId) {
        return this.tourRepository.find({
            where: { partnerId },
            order: { createdAt: 'DESC' },
        });
    }
    async createTour(partnerId, data) {
        const tour = this.tourRepository.create({
            ...data,
            partnerId,
        });
        return this.tourRepository.save(tour);
    }
    async getStatsSummary(partnerId) {
        const totalPackages = await this.tourPackageRepository.count({
            where: { partnerId },
        });
        const totalTours = await this.tourRepository.count({
            where: { partnerId },
        });
        const bookings = await this.bookingRepository.find({
            where: { tourPartnerId: partnerId },
            order: { createdAt: 'DESC' },
        });
        const revenue = bookings
            .filter((b) => b.status === booking_entity_1.BookingStatus.CONFIRMED ||
            b.status === booking_entity_1.BookingStatus.COMPLETED)
            .reduce((acc, b) => acc + Number(b.totalAmount), 0);
        const pendingBookings = bookings.filter((b) => b.status === booking_entity_1.BookingStatus.PENDING).length;
        const activeBookings = bookings.filter((b) => b.status === booking_entity_1.BookingStatus.CONFIRMED).length;
        const completedBookings = bookings.filter((b) => b.status === booking_entity_1.BookingStatus.COMPLETED).length;
        const recentBookings = bookings.slice(0, 5).map((b) => ({
            ref: b.bookingReference || `PK-${b.id.slice(0, 4)}`,
            customer: b.guestName,
            package: b.packageName || 'Unknown Tour',
            date: new Date(b.startDate).toLocaleDateString(),
            status: b.status.toLowerCase(),
            amount: `₹${Number(b.totalAmount).toLocaleString()}`,
        }));
        return {
            revenue,
            totalPackages,
            totalTours,
            totalListings: totalPackages + totalTours,
            pendingBookings,
            activeBookings,
            completedBookings,
            recentBookings,
        };
    }
    async getPaymentStats(partnerId) {
        const bookings = await this.bookingRepository.find({
            where: { tourPartnerId: partnerId },
        });
        const availableBalance = bookings
            .filter((b) => b.status === booking_entity_1.BookingStatus.COMPLETED)
            .reduce((acc, b) => acc + Number(b.totalAmount), 0);
        const pendingSettlements = bookings
            .filter((b) => b.status === booking_entity_1.BookingStatus.CONFIRMED)
            .reduce((acc, b) => acc + Number(b.totalAmount), 0);
        const lastPayout = availableBalance > 0 ? availableBalance * 0.8 : 0;
        return {
            availableBalance,
            pendingSettlements,
            lastPayout,
            nextPayoutDate: '25th ' + new Date().toLocaleString('default', { month: 'short' }),
            lastPayoutDate: '15th ' + new Date().toLocaleString('default', { month: 'short' }),
        };
    }
    async getPaymentTransactions(partnerId) {
        const bookings = await this.bookingRepository.find({
            where: { tourPartnerId: partnerId },
            order: { createdAt: 'DESC' },
        });
        return bookings.map((b) => ({
            id: b.bookingReference || `TRX-${b.id.slice(0, 8)}`,
            traveler: b.guestName,
            amount: Number(b.totalAmount),
            status: b.status === booking_entity_1.BookingStatus.COMPLETED
                ? 'PAID'
                : b.status === booking_entity_1.BookingStatus.CANCELLED
                    ? 'REFUNDED'
                    : 'PENDING',
            method: 'Stripe',
            date: b.createdAt,
        }));
    }
    async getLeads(partnerId) {
        return this.leadRepository.find({
            where: { partnerId },
            relations: ['package'],
            order: { createdAt: 'DESC' },
        });
    }
    async updateLeadStatus(id, status) {
        await this.leadRepository.update(id, { status });
        return this.leadRepository.findOne({ where: { id } });
    }
    async getItinerary(packageId) {
        return this.activityRepository.find({
            where: { packageId },
            order: { day: 'ASC' },
        });
    }
    async saveItinerary(packageId, activities) {
        await this.activityRepository.delete({ packageId });
        const entities = this.activityRepository.create(activities.map((a) => ({ ...a, packageId })));
        return this.activityRepository.save(entities);
    }
    async getTiers(packageId) {
        return this.tierRepository.find({
            where: { packageId },
            order: { paxMin: 'ASC' },
        });
    }
    async saveTiers(packageId, tiers) {
        await this.tierRepository.delete({ packageId });
        const entities = this.tierRepository.create(tiers.map((t) => ({ ...t, packageId })));
        return this.tierRepository.save(entities);
    }
    async getDepartures(packageId) {
        return this.departureRepository.find({
            where: { packageId },
            order: { date: 'ASC' },
        });
    }
    async saveDepartures(packageId, departures) {
        await this.departureRepository.delete({ packageId });
        const entities = this.departureRepository.create(departures.map((d) => ({ ...d, packageId })));
        return this.departureRepository.save(entities);
    }
};
exports.PackagesService = PackagesService;
exports.PackagesService = PackagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tour_partner_entity_1.TourPartner)),
    __param(1, (0, typeorm_1.InjectRepository)(tour_package_entity_1.TourPackage)),
    __param(2, (0, typeorm_1.InjectRepository)(tour_entity_1.Tour)),
    __param(3, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __param(4, (0, typeorm_1.InjectRepository)(lead_entity_1.Lead)),
    __param(5, (0, typeorm_1.InjectRepository)(itinerary_activity_entity_1.ItineraryActivity)),
    __param(6, (0, typeorm_1.InjectRepository)(package_departure_entity_1.PackageDeparture)),
    __param(7, (0, typeorm_1.InjectRepository)(package_tier_entity_1.PackageTier)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PackagesService);
//# sourceMappingURL=packages.service.js.map