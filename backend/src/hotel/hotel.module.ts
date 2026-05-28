import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelController } from './hotel.controller';
import { PublicHotelController } from './public-hotel.controller';
import { HotelService } from './hotel.service';
import { Hotel } from './entities/hotel.entity';
import { RatePlan } from './entities/rate-plan.entity';
import { Review } from './entities/review.entity';
import { PromotionsModule } from '../promotions/promotions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hotel, RatePlan, Review]),
    PromotionsModule,
  ],
  controllers: [HotelController, PublicHotelController],
  providers: [HotelService],
  exports: [TypeOrmModule],
})
export class HotelModule {}
