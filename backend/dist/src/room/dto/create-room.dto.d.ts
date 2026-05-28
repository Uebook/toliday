import { RoomStatus } from '../entities/room.entity';
export declare class CreateRoomDto {
    roomNumber: string;
    floor?: string;
    status?: RoomStatus;
    roomTypeId: string;
}
