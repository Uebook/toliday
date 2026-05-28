import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CabsController } from './cabs.controller';
import { CabsService } from './cabs.service';
import { CabVendor } from './entities/cab-vendor.entity';
import { Vehicle } from './entities/vehicle.entity';
import { Driver } from './entities/driver.entity';
import { CabPricing } from './entities/cab-pricing.entity';
import { CabBooking } from './entities/cab-booking.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CabVendor,
      Vehicle,
      Driver,
      CabPricing,
      CabBooking,
    ]),
  ],
  controllers: [CabsController],
  providers: [CabsService],
  exports: [TypeOrmModule, CabsService],
})
export class CabsModule {}
