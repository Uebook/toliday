import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusesService } from './buses.service';
import { BusesController } from './buses.controller';
import { BusVendor } from './entities/bus-vendor.entity';
import { Bus } from './entities/bus.entity';
import { BusRoute } from './entities/bus-route.entity';
import { BusSchedule } from './entities/bus-schedule.entity';
import { SeatLayout } from './entities/seat-layout.entity';
import { PublicBusesController } from './public-buses.controller';
import { BusBooking } from './entities/bus-booking.entity';
import { YieldRule } from './entities/yield-rule.entity';
import { Crew } from './entities/crew.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BusVendor,
      Bus,
      BusRoute,
      BusSchedule,
      SeatLayout,
      Crew,
      BusBooking,
      YieldRule,
    ]),
  ],
  controllers: [BusesController, PublicBusesController],
  providers: [BusesService],
  exports: [BusesService],
})
export class BusesModule {}
