import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    findAll(): Promise<import("./entities/global-setting.entity").GlobalSetting[]>;
    updateMany(body: {
        settings: {
            key: string;
            value: string;
        }[];
    }): Promise<{
        success: boolean;
    }>;
}
