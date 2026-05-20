import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomTypeController } from './room-type.controller';
import { RoomTypeService } from './room-type.service';
import { RoomType } from './entities/room-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType])],
  controllers: [RoomTypeController],
  providers: [RoomTypeService],
  exports: [TypeOrmModule]
})
export class RoomTypeModule { }
