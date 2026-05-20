import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomType } from './entities/room-type.entity';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';

@Injectable()
export class RoomTypeService {
       constructor(
              @InjectRepository(RoomType)
              private roomTypeRepository: Repository<RoomType>,
       ) { }

       async create(hotelId: string, createDto: CreateRoomTypeDto): Promise<RoomType> {
              const roomType = this.roomTypeRepository.create({
                     ...createDto,
                     hotelId,
              });
              return this.roomTypeRepository.save(roomType);
       }

       async findAllByHotel(hotelId: string): Promise<RoomType[]> {
              return this.roomTypeRepository.find({ where: { hotelId } });
       }

       async findOne(id: string, hotelId: string): Promise<RoomType> {
              const roomType = await this.roomTypeRepository.findOne({ where: { id, hotelId } });
              if (!roomType) {
                     throw new NotFoundException(`RoomType with ID ${id} not found.`);
              }
              return roomType;
       }

       async remove(id: string, hotelId: string): Promise<void> {
              const result = await this.roomTypeRepository.delete({ id, hotelId });
              if (result.affected === 0) {
                     throw new NotFoundException(`RoomType with ID ${id} not found.`);
              }
       }

       async update(id: string, hotelId: string, updateDto: any): Promise<RoomType> {
              await this.roomTypeRepository.update({ id, hotelId }, updateDto);
              return this.findOne(id, hotelId);
       }
}
