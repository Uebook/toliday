import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { InventoryModule } from '../inventory/inventory.module'; // To adjust inventory

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    InventoryModule
  ],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [TypeOrmModule]
})
export class BookingModule { }
