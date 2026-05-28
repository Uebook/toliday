import { PromotionsService } from './promotions.service';
export declare class PromotionsController {
    private readonly promotionsService;
    constructor(promotionsService: PromotionsService);
    private extractVendorContext;
    create(req: any, body: any): Promise<import("./entities/promotion.entity").Promotion>;
    findAll(req: any): Promise<import("./entities/promotion.entity").Promotion[]>;
    findOne(req: any, id: string): Promise<import("./entities/promotion.entity").Promotion>;
    update(req: any, id: string, body: any): Promise<import("./entities/promotion.entity").Promotion>;
    remove(req: any, id: string): Promise<void>;
}
