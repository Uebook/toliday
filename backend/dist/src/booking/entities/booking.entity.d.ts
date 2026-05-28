import { Hotel } from '../../hotel/entities/hotel.entity';
import { RoomType } from '../../room-type/entities/room-type.entity';
import { Room } from '../../room/entities/room.entity';
export declare enum BookingStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
    CHECKED_IN = "CHECKED_IN",
    CHECKED_OUT = "CHECKED_OUT",
    COMPLETED = "COMPLETED"
}
export declare class Booking {
    id: string;
    guestName: string;
    guestEmail: string;
    guestContact: string;
    startDate: string;
    endDate: string;
    numberOfGuests: number;
    totalAmount: number;
    bookingReference: string;
    status: BookingStatus;
    hotelId: string;
    hotel: Hotel;
    roomTypeId: string;
    roomType: RoomType;
    tourPartnerId: string;
    packageId: string;
    packageName: string;
    isSettled: boolean;
    commissionAmount: number;
    netAmount: number;
    assignedRoomId: string;
    assignedRoom: Room;
    createdAt: Date;
    updatedAt: Date;
}
