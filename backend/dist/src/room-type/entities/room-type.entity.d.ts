import { Hotel } from '../../hotel/entities/hotel.entity';
import { Inventory } from '../../inventory/entities/inventory.entity';
import { Booking } from '../../booking/entities/booking.entity';
import { RatePlan } from '../../hotel/entities/rate-plan.entity';
import { Room } from '../../room/entities/room.entity';
export declare class RoomType {
    id: string;
    name: string;
    description: string;
    price: number;
    capacity: number;
    extraPersonPrice: number;
    size: string;
    amenities: string[];
    images: string[];
    totalRooms: number;
    hotelId: string;
    hotel: Hotel;
    inventories: Inventory[];
    bookings: Booking[];
    ratePlans: RatePlan[];
    rooms: Room[];
    createdAt: Date;
    updatedAt: Date;
}
