import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlobalInventory, VerticalType } from './entities/global-inventory.entity';

@Injectable()
export class GlobalInventoryService {
  constructor(
    @InjectRepository(GlobalInventory)
    private invRepo: Repository<GlobalInventory>,
  ) {}

  async findAllAdmin(vertical?: VerticalType) {
    const where = vertical ? { vertical } : {};
    return this.invRepo.find({
      where,
      order: { date: 'DESC' },
    });
  }

  async findByVendor(vendorId: string, vertical?: VerticalType) {
    const where: any = { vendorId };
    if (vertical) where.vertical = vertical;
    return this.invRepo.find({
      where,
      order: { date: 'DESC' },
    });
  }

  async updateInventory(id: string, updateData: Partial<GlobalInventory>) {
    await this.invRepo.update(id, updateData);
    return this.invRepo.findOne({ where: { id } });
  }
}
