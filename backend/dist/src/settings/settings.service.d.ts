import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GlobalSetting } from './entities/global-setting.entity';
export declare class SettingsService implements OnModuleInit {
    private settingsRepo;
    constructor(settingsRepo: Repository<GlobalSetting>);
    onModuleInit(): Promise<void>;
    findAll(): Promise<GlobalSetting[]>;
    findByCategory(category: string): Promise<GlobalSetting[]>;
    updateMany(settings: {
        key: string;
        value: string;
    }[]): Promise<{
        success: boolean;
    }>;
}
