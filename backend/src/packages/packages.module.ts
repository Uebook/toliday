import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourPartner } from './entities/tour-partner.entity';
import { TourPackage } from './entities/tour-package.entity';
import { Tour } from './entities/tour.entity';
import { Booking } from '../booking/entities/booking.entity';
import { Lead } from './entities/lead.entity';
import { ItineraryActivity } from './entities/itinerary-activity.entity';
import { PackageDeparture } from './entities/package-departure.entity';
import { PackageTier } from './entities/package-tier.entity';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TourPartner,
      TourPackage,
      Tour,
      Booking,
      Lead,
      ItineraryActivity,
      PackageDeparture,
      PackageTier,
    ]),
  ],
  controllers: [PackagesController],
  providers: [PackagesService],
  exports: [TypeOrmModule, PackagesService],
})
export class PackagesModule {}
