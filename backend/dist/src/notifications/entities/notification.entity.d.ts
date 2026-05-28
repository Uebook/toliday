import { Hotel } from '../../hotel/entities/hotel.entity';
export declare enum NotificationType {
    BOOKING = "booking",
    PAYMENT = "payment",
    SYSTEM = "system"
}
export declare class Notification {
    id: string;
    hotelId: string;
    hotel: Hotel;
    type: NotificationType;
    title: string;
    message: string;
    read: boolean;
    createdAt: Date;
}
