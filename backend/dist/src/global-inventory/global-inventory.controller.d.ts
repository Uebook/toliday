import { GlobalInventoryService } from './global-inventory.service';
import { VerticalType } from './entities/global-inventory.entity';
export declare class GlobalInventoryController {
    private readonly inventoryService;
    constructor(inventoryService: GlobalInventoryService);
    private checkAdmin;
    findAll(req: any, vertical?: VerticalType): Promise<import("./entities/global-inventory.entity").GlobalInventory[]>;
    findByVendor(req: any, vendorId: string, vertical?: VerticalType): Promise<import("./entities/global-inventory.entity").GlobalInventory[]>;
    updateInventory(req: any, id: string, updateData: any): Promise<import("./entities/global-inventory.entity").GlobalInventory | null>;
}
