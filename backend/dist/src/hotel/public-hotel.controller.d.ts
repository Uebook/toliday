import { HotelService } from './hotel.service';
export declare class PublicHotelController {
    private readonly hotelService;
    constructor(hotelService: HotelService);
    findAll(): Promise<import("./entities/hotel.entity").Hotel[]>;
    findById(id: string): Promise<import("./entities/hotel.entity").Hotel>;
}
