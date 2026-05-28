import { Hotel } from '../../hotel/entities/hotel.entity';
export declare class NotificationSetting {
    id: string;
    hotelId: string;
    hotel: Hotel;
    newBookings: boolean;
    cancellations: boolean;
    paymentUpdates: boolean;
    inventoryAlerts: boolean;
    checkInReminders: boolean;
    rateSuggestions: boolean;
}
