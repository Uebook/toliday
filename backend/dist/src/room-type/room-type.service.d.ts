import { Repository } from 'typeorm';
import { RoomType } from './entities/room-type.entity';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
export declare class RoomTypeService {
    private roomTypeRepository;
    constructor(roomTypeRepository: Repository<RoomType>);
    create(hotelId: string, createDto: CreateRoomTypeDto): Promise<RoomType>;
    findAllByHotel(hotelId: string): Promise<RoomType[]>;
    findOne(id: string, hotelId: string): Promise<RoomType>;
    remove(id: string, hotelId: string): Promise<void>;
    update(id: string, hotelId: string, updateDto: any): Promise<RoomType>;
}
