import { RatesService } from './rates.service';
export declare class RatesController {
    private readonly ratesService;
    constructor(ratesService: RatesService);
    findAll(req: any, hotelId: string): Promise<import("./entities/rate.entity").Rate[]>;
    findOne(req: any, id: string): Promise<import("./entities/rate.entity").Rate>;
    create(req: any, body: any): Promise<import("./entities/rate.entity").Rate>;
    update(id: string, body: any): Promise<import("./entities/rate.entity").Rate>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
