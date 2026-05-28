import { RoomStatus } from '../entities/room.entity';
export declare class UpdateRoomDto {
    roomNumber?: string;
    floor?: string;
    status?: RoomStatus;
    roomTypeId?: string;
}
