import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { Booking } from '../booking/entities/booking.entity';
import { Inventory } from '../inventory/entities/inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Inventory])],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule { }
