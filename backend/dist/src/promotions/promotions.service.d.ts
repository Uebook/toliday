import { Repository } from 'typeorm';
import { Promotion } from './entities/promotion.entity';
import { VerticalType } from '../common/enums/vertical.enum';
export declare class PromotionsService {
    private promotionRepo;
    constructor(promotionRepo: Repository<Promotion>);
    create(vendorId: string, vertical: VerticalType, dto: any): Promise<Promotion>;
    findAllByVendor(vendorId: string, vertical: VerticalType): Promise<Promotion[]>;
    findOne(id: string, vendorId: string): Promise<Promotion>;
    update(id: string, vendorId: string, dto: any): Promise<Promotion>;
    remove(id: string, vendorId: string): Promise<void>;
}
