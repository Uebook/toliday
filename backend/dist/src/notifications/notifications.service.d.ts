import { Repository } from 'typeorm';
import { Notification, NotificationType } from './entities/notification.entity';
import { NotificationSetting } from './entities/notification-setting.entity';
export declare class NotificationsService {
    private notifRepository;
    private settingsRepository;
    constructor(notifRepository: Repository<Notification>, settingsRepository: Repository<NotificationSetting>);
    getSettings(hotelId: string): Promise<NotificationSetting>;
    updateSettings(hotelId: string, dto: Partial<NotificationSetting>): Promise<NotificationSetting>;
    findAll(hotelId: string): Promise<Notification[]>;
    create(hotelId: string, dto: {
        type: NotificationType;
        title: string;
        message: string;
    }): Promise<Notification>;
    markRead(id: string): Promise<{
        message: string;
    }>;
    markAllRead(hotelId: string): Promise<{
        message: string;
    }>;
}
