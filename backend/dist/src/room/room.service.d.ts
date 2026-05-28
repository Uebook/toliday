import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
export declare class RoomService {
    private roomRepository;
    constructor(roomRepository: Repository<Room>);
    create(createRoomDto: CreateRoomDto): Promise<Room>;
    findAllByHotel(hotelId: string): Promise<Room[]>;
    findOne(id: string, hotelId: string): Promise<Room>;
    update(id: string, hotelId: string, updateRoomDto: UpdateRoomDto): Promise<Room>;
    remove(id: string, hotelId: string): Promise<void>;
}
