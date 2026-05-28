import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomType } from '../room-type/entities/room-type.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const room = this.roomRepository.create(createRoomDto);
    return this.roomRepository.save(room);
  }

  async findAllByHotel(hotelId: string): Promise<Room[]> {
    return this.roomRepository
      .createQueryBuilder('room')
      .innerJoinAndSelect('room.roomType', 'roomType')
      .where('roomType.hotelId = :hotelId', { hotelId })
      .getMany();
  }

  async findOne(id: string, hotelId: string): Promise<Room> {
    const room = await this.roomRepository
      .createQueryBuilder('room')
      .innerJoinAndSelect('room.roomType', 'roomType')
      .where('room.id = :id', { id })
      .andWhere('roomType.hotelId = :hotelId', { hotelId })
      .getOne();

    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return room;
  }

  async update(id: string, hotelId: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.findOne(id, hotelId);
    Object.assign(room, updateRoomDto);
    return this.roomRepository.save(room);
  }

  async remove(id: string, hotelId: string): Promise<void> {
    const room = await this.findOne(id, hotelId);
    await this.roomRepository.remove(room);
  }
}
