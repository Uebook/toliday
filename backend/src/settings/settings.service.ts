import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlobalSetting } from './entities/global-setting.entity';

@Injectable()
export class SettingsService implements OnModuleInit {
  constructor(
    @InjectRepository(GlobalSetting)
    private settingsRepo: Repository<GlobalSetting>,
  ) {}

  async onModuleInit() {
    const defaults = [
      {
        key: 'COMMISSION_HOTEL',
        value: '10',
        category: 'FINANCE',
        description: 'Default commission % for hotel bookings',
      },
      {
        key: 'COMMISSION_PACKAGE',
        value: '12',
        category: 'FINANCE',
        description: 'Default commission % for tour packages',
      },
      {
        key: 'COMMISSION_BUS',
        value: '5',
        category: 'FINANCE',
        description: 'Default commission % for bus tickets',
      },
      {
        key: 'COMMISSION_CAB',
        value: '8',
        category: 'FINANCE',
        description: 'Default commission % for cab rentals',
      },
      {
        key: 'TAX_GST',
        value: '18',
        category: 'FINANCE',
        description: 'Standard GST % for services',
      },
    ];

    for (const item of defaults) {
      const existing = await this.settingsRepo.findOne({
        where: { key: item.key },
      });
      if (!existing) {
        await this.settingsRepo.save(this.settingsRepo.create(item));
      }
    }
  }

  async findAll() {
    return this.settingsRepo.find();
  }

  async findByCategory(category: string) {
    return this.settingsRepo.find({ where: { category } });
  }

  async updateMany(settings: { key: string; value: string }[]) {
    for (const item of settings) {
      await this.settingsRepo.update({ key: item.key }, { value: item.value });
    }
    return { success: true };
  }
}
