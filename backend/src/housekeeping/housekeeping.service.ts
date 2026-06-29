import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Housekeeping, HousekeepingStatus } from './entities/housekeeping.entity';

@Injectable()
export class HousekeepingService {
  constructor(
    @InjectRepository(Housekeeping)
    private readonly housekeepingRepository: Repository<Housekeeping>,
  ) {}

  async findAll(hotelId: string): Promise<Housekeeping[]> {
    return this.housekeepingRepository.find({
      where: { hotelId },
      relations: ['roomType', 'assignedStaff'],
      order: { roomNumber: 'ASC' },
    });
  }

  async create(hotelId: string, data: { roomNumber: string; roomTypeId: string; status?: HousekeepingStatus; assignedStaffId?: string }): Promise<Housekeeping> {
    const record = this.housekeepingRepository.create({
      ...data,
      hotelId,
      status: data.status || HousekeepingStatus.DIRTY,
    });
    return this.housekeepingRepository.save(record);
  }

  async update(
    id: string,
    hotelId: string,
    updateDto: { status?: HousekeepingStatus; assignedStaffId?: string; roomNumber?: string; roomTypeId?: string },
  ): Promise<Housekeeping> {
    const record = await this.housekeepingRepository.findOne({
      where: { id, hotelId },
    });
    if (!record) {
      throw new NotFoundException(`Housekeeping record with ID ${id} not found.`);
    }

    if (updateDto.status) record.status = updateDto.status;
    if (updateDto.assignedStaffId !== undefined) {
      record.assignedStaffId = (updateDto.assignedStaffId === '' ? null : updateDto.assignedStaffId) as any;
    }
    if (updateDto.roomNumber) record.roomNumber = updateDto.roomNumber;
    if (updateDto.roomTypeId) record.roomTypeId = updateDto.roomTypeId;

    return this.housekeepingRepository.save(record);
  }

  async remove(id: string, hotelId: string): Promise<void> {
    const result = await this.housekeepingRepository.delete({ id, hotelId });
    if (result.affected === 0) {
      throw new NotFoundException(`Housekeeping record with ID ${id} not found.`);
    }
  }
}
