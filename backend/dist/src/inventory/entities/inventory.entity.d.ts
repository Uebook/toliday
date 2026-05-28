import { RoomType } from '../../room-type/entities/room-type.entity';
export declare class Inventory {
    id: string;
    date: string;
    totalRooms: number;
    availableRooms: number;
    priceOverride: number;
    roomTypeId: string;
    roomType: RoomType;
    createdAt: Date;
    updatedAt: Date;
}
