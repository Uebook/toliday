import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { Staff } from './entities/staff.entity';
import { Hotel } from '../hotel/entities/hotel.entity';
import { TourPartner } from '../packages/entities/tour-partner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, Hotel, TourPartner])],
  controllers: [StaffController],
  providers: [StaffService],
  exports: [StaffService],
})
export class StaffModule {}
