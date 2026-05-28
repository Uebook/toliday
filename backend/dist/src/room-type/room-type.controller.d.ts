import { RoomTypeService } from './room-type.service';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
export declare class RoomTypeController {
    private readonly roomTypeService;
    constructor(roomTypeService: RoomTypeService);
    create(req: any, createDto: CreateRoomTypeDto): Promise<import("./entities/room-type.entity").RoomType>;
    findAll(req: any): Promise<import("./entities/room-type.entity").RoomType[]>;
    findOne(req: any, id: string): Promise<import("./entities/room-type.entity").RoomType>;
    remove(req: any, id: string): Promise<void>;
    update(req: any, id: string, body: any): Promise<import("./entities/room-type.entity").RoomType>;
}
