import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promotion } from './entities/promotion.entity';
import { VerticalType } from '../common/enums/vertical.enum';

@Injectable()
export class PromotionsService {
    constructor(
        @InjectRepository(Promotion)
        private promotionRepo: Repository<Promotion>,
    ) {}

    async create(vendorId: string, vertical: VerticalType, dto: any): Promise<Promotion> {
        const promotion = this.promotionRepo.create({
            ...dto,
            vendorId,
            vertical,
        }) as any;
        return this.promotionRepo.save(promotion);
    }

    async findAllByVendor(vendorId: string, vertical: VerticalType): Promise<Promotion[]> {
        return this.promotionRepo.find({
            where: { vendorId, vertical },
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string, vendorId: string): Promise<Promotion> {
        const promotion = await this.promotionRepo.findOne({ where: { id, vendorId } });
        if (!promotion) throw new NotFoundException('Promotion not found');
        return promotion;
    }

    async update(id: string, vendorId: string, dto: any): Promise<Promotion> {
        const promotion = await this.findOne(id, vendorId);
        Object.assign(promotion, dto);
        return this.promotionRepo.save(promotion);
    }

    async remove(id: string, vendorId: string): Promise<void> {
        const promotion = await this.findOne(id, vendorId);
        await this.promotionRepo.remove(promotion);
    }
}
