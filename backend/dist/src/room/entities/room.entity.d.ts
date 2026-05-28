import { RoomType } from '../../room-type/entities/room-type.entity';
import { Booking } from '../../booking/entities/booking.entity';
export declare enum RoomStatus {
    AVAILABLE = "AVAILABLE",
    MAINTENANCE = "MAINTENANCE",
    NEEDS_CLEANING = "NEEDS_CLEANING"
}
export declare class Room {
    id: string;
    roomNumber: string;
    floor: string;
    status: RoomStatus;
    roomTypeId: string;
    roomType: RoomType;
    bookings: Booking[];
    createdAt: Date;
    updatedAt: Date;
}
