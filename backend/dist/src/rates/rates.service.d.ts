import { Repository } from 'typeorm';
import { Rate } from './entities/rate.entity';
export declare class RatesService {
    private ratesRepository;
    constructor(ratesRepository: Repository<Rate>);
    findAll(hotelId: string): Promise<Rate[]>;
    findOne(id: string): Promise<Rate>;
    create(hotelId: string, dto: Partial<Rate>): Promise<Rate>;
    update(id: string, dto: Partial<Rate>): Promise<Rate>;
    remove(id: string): Promise<{
        message: string;
    }>;
    findAllForTourPartner(tourPartnerId: string): Promise<Rate[]>;
    findOneForTourPartner(id: string, tourPartnerId: string): Promise<Rate>;
    createForTourPartner(tourPartnerId: string, dto: Partial<Rate>): Promise<Rate>;
}
