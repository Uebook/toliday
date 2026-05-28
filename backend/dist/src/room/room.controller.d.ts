import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
export declare class RoomController {
    private readonly roomService;
    constructor(roomService: RoomService);
    create(req: any, createRoomDto: CreateRoomDto): Promise<import("./entities/room.entity").Room>;
    findAll(req: any): Promise<import("./entities/room.entity").Room[]>;
    findOne(req: any, id: string): Promise<import("./entities/room.entity").Room>;
    update(req: any, id: string, updateRoomDto: UpdateRoomDto): Promise<import("./entities/room.entity").Room>;
    remove(req: any, id: string): Promise<void>;
}
