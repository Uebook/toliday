import { Repository } from 'typeorm';
import { GlobalInventory, VerticalType } from './entities/global-inventory.entity';
export declare class GlobalInventoryService {
    private invRepo;
    constructor(invRepo: Repository<GlobalInventory>);
    findAllAdmin(vertical?: VerticalType): Promise<GlobalInventory[]>;
    findByVendor(vendorId: string, vertical?: VerticalType): Promise<GlobalInventory[]>;
    updateInventory(id: string, updateData: Partial<GlobalInventory>): Promise<GlobalInventory | null>;
}
