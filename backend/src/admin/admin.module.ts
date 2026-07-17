import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Hotel } from '../hotel/entities/hotel.entity';
import { Booking } from '../booking/entities/booking.entity';
import { Staff } from '../staff/entities/staff.entity';
import { SupportModule } from '../support/support.module';
import { WhatsappModule } from '../whatsapp/whatsapp.module';

import { TourPartner } from '../packages/entities/tour-partner.entity';
import { BusVendor } from '../buses/entities/bus-vendor.entity';
import { CabVendor } from '../cabs/entities/cab-vendor.entity';
import { BusBooking } from '../buses/entities/bus-booking.entity';
import { CabBooking } from '../cabs/entities/cab-booking.entity';
import { Promotion } from '../promotions/entities/promotion.entity';
import { RoomType } from '../room-type/entities/room-type.entity';
import { TourPackage } from '../packages/entities/tour-package.entity';
import { Bus } from '../buses/entities/bus.entity';
import { Vehicle } from '../cabs/entities/vehicle.entity';
import { GlobalSetting } from '../settings/entities/global-setting.entity';
import { LedgerEntry } from '../finance/entities/ledger-entry.entity';
import { Review } from '../hotel/entities/review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Hotel,
      Booking,
      Staff,
      TourPartner,
      BusVendor,
      CabVendor,
      BusBooking,
      CabBooking,
      Promotion,
      RoomType,
      TourPackage,
      Bus,
      Vehicle,
      GlobalSetting,
      LedgerEntry,
      Review,
    ]),
    SupportModule,
    WhatsappModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
