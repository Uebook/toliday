import { InventoryService } from './inventory.service';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    updateInventory(req: any, updateDto: UpdateInventoryDto): Promise<{
        message: string;
    }>;
    getInventory(req: any, startDate: string, endDate: string): Promise<import("./entities/inventory.entity").Inventory[]>;
}
