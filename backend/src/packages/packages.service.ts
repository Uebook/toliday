import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TourPartner } from './entities/tour-partner.entity';
import { TourPackage } from './entities/tour-package.entity';
import { Tour } from './entities/tour.entity';
import { Booking, BookingStatus } from '../booking/entities/booking.entity';
import { Lead } from './entities/lead.entity';
import { ItineraryActivity } from './entities/itinerary-activity.entity';
import { PackageDeparture } from './entities/package-departure.entity';
import { PackageTier } from './entities/package-tier.entity';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(TourPartner)
    private tourPartnerRepository: Repository<TourPartner>,
    @InjectRepository(TourPackage)
    private tourPackageRepository: Repository<TourPackage>,
    @InjectRepository(Tour)
    private tourRepository: Repository<Tour>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
    @InjectRepository(ItineraryActivity)
    private activityRepository: Repository<ItineraryActivity>,
    @InjectRepository(PackageDeparture)
    private departureRepository: Repository<PackageDeparture>,
    @InjectRepository(PackageTier)
    private tierRepository: Repository<PackageTier>,
  ) {}

  async getProfile(id: string) {
    const partner = await this.tourPartnerRepository.findOne({ where: { id } });
    if (!partner) throw new NotFoundException('Partner not found');
    return partner;
  }

  async updateProfile(id: string, data: any) {
    const partner = await this.getProfile(id);
    Object.assign(partner, data);
    return this.tourPartnerRepository.save(partner);
  }

  // Packages (Multi-day)
  async getTourPackages(partnerId: string) {
    return this.tourPackageRepository.find({
      where: { partnerId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOnePackage(id: string, partnerId: string) {
    const pkg = await this.tourPackageRepository.findOne({
      where: { id, partnerId },
    });
    if (!pkg) throw new NotFoundException('Package not found');
    return pkg;
  }

  async createTourPackage(partnerId: string, data: any) {
    try {
      console.log('[DEBUG] Creating Tour Package:', { partnerId, data });
      const pkg = this.tourPackageRepository.create({
        ...data,
        partnerId,
      });
      return await this.tourPackageRepository.save(pkg);
    } catch (err: any) {
      console.error(
        '[CRITICAL] Failed to create tour package:',
        err.message,
        err.stack,
      );
      throw err;
    }
  }

  async updatePackage(id: string, partnerId: string, data: any) {
    const pkg = await this.findOnePackage(id, partnerId);
    Object.assign(pkg, data);
    return this.tourPackageRepository.save(pkg);
  }

  async removePackage(id: string, partnerId: string) {
    const pkg = await this.findOnePackage(id, partnerId);
    return this.tourPackageRepository.remove(pkg);
  }

  // Tours (Single-day/Sightseeing)
  async getTours(partnerId: string) {
    return this.tourRepository.find({
      where: { partnerId },
      order: { createdAt: 'DESC' },
    });
  }

  async createTour(partnerId: string, data: any) {
    const tour = this.tourRepository.create({
      ...data,
      partnerId,
    });
    return this.tourRepository.save(tour);
  }

  async getStatsSummary(partnerId: string) {
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
      .filter(
        (b) =>
          b.status === BookingStatus.CONFIRMED ||
          b.status === BookingStatus.COMPLETED,
      )
      .reduce((acc, b) => acc + Number(b.totalAmount), 0);

    const pendingBookings = bookings.filter(
      (b) => b.status === BookingStatus.PENDING,
    ).length;
    const activeBookings = bookings.filter(
      (b) => b.status === BookingStatus.CONFIRMED,
    ).length;
    const completedBookings = bookings.filter(
      (b) => b.status === BookingStatus.COMPLETED,
    ).length;

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

  async getPaymentStats(partnerId: string) {
    const bookings = await this.bookingRepository.find({
      where: { tourPartnerId: partnerId },
    });

    const availableBalance = bookings
      .filter((b) => b.status === BookingStatus.COMPLETED)
      .reduce((acc, b) => acc + Number(b.totalAmount), 0);

    const pendingSettlements = bookings
      .filter((b) => b.status === BookingStatus.CONFIRMED)
      .reduce((acc, b) => acc + Number(b.totalAmount), 0);

    // For demo purposes, we'll calculate last payout as a percentage of total
    const lastPayout = availableBalance > 0 ? availableBalance * 0.8 : 0;

    return {
      availableBalance,
      pendingSettlements,
      lastPayout,
      nextPayoutDate:
        '25th ' + new Date().toLocaleString('default', { month: 'short' }),
      lastPayoutDate:
        '15th ' + new Date().toLocaleString('default', { month: 'short' }),
    };
  }

  async getPaymentTransactions(partnerId: string) {
    const bookings = await this.bookingRepository.find({
      where: { tourPartnerId: partnerId },
      order: { createdAt: 'DESC' },
    });

    return bookings.map((b) => ({
      id: b.bookingReference || `TRX-${b.id.slice(0, 8)}`,
      traveler: b.guestName,
      amount: Number(b.totalAmount),
      status:
        b.status === BookingStatus.COMPLETED
          ? 'PAID'
          : b.status === BookingStatus.CANCELLED
            ? 'REFUNDED'
            : 'PENDING',
      method: 'Stripe', // Default for now
      date: b.createdAt,
    }));
  }

  // CRM Leads
  async getLeads(partnerId: string) {
    return this.leadRepository.find({
      where: { partnerId },
      relations: ['package'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateLeadStatus(id: string, status: any) {
    await this.leadRepository.update(id, { status });
    return this.leadRepository.findOne({ where: { id } });
  }

  // Itinerary Builder
  async getItinerary(packageId: string) {
    return this.activityRepository.find({
      where: { packageId },
      order: { day: 'ASC' },
    });
  }

  async saveItinerary(packageId: string, activities: any[]) {
    // Clear existing and save new
    await this.activityRepository.delete({ packageId });
    const entities = this.activityRepository.create(
      activities.map((a) => ({ ...a, packageId })),
    );
    return this.activityRepository.save(entities);
  }

  // Tiers
  async getTiers(packageId: string) {
    return this.tierRepository.find({
      where: { packageId },
      order: { paxMin: 'ASC' },
    });
  }

  async saveTiers(packageId: string, tiers: any[]) {
    await this.tierRepository.delete({ packageId });
    const entities = this.tierRepository.create(
      tiers.map((t) => ({ ...t, packageId })),
    );
    return this.tierRepository.save(entities);
  }

  // Departures
  async getDepartures(packageId: string) {
    return this.departureRepository.find({
      where: { packageId },
      order: { date: 'ASC' },
    });
  }

  async saveDepartures(packageId: string, departures: any[]) {
    await this.departureRepository.delete({ packageId });
    const entities = this.departureRepository.create(
      departures.map((d) => ({ ...d, packageId })),
    );
    return this.departureRepository.save(entities);
  }
}
