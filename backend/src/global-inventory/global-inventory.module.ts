import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalInventoryService } from './global-inventory.service';
import { GlobalInventoryController } from './global-inventory.controller';
import { GlobalInventory } from './entities/global-inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GlobalInventory])],
  controllers: [GlobalInventoryController],
  providers: [GlobalInventoryService],
  exports: [GlobalInventoryService],
})
export class GlobalInventoryModule {}
