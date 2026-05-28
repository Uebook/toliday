import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(hotelId: string): Promise<import("./entities/notification.entity").Notification[]>;
    create(body: any): Promise<import("./entities/notification.entity").Notification>;
    getSettings(hotelId: string): Promise<import("./entities/notification-setting.entity").NotificationSetting>;
    updateSettings(hotelId: string, dto: any): Promise<import("./entities/notification-setting.entity").NotificationSetting>;
    markAllRead(hotelId: string): Promise<{
        message: string;
    }>;
    markRead(id: string): Promise<{
        message: string;
    }>;
}
