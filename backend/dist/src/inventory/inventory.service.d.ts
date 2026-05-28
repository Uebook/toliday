import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
export declare class InventoryService {
    private inventoryRepository;
    constructor(inventoryRepository: Repository<Inventory>);
    bulkUpdate(hotelId: string, updateDto: UpdateInventoryDto): Promise<{
        message: string;
    }>;
    getInventory(hotelId: string, startDate: string, endDate: string): Promise<Inventory[]>;
    reduceInventory(roomTypeId: string, startDate: string, endDate: string, count: number, manager?: any): Promise<void>;
    increaseInventory(roomTypeId: string, startDate: string, endDate: string, count: number, manager?: any): Promise<void>;
}
