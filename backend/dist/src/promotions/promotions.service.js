"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const promotion_entity_1 = require("./entities/promotion.entity");
let PromotionsService = class PromotionsService {
    promotionRepo;
    constructor(promotionRepo) {
        this.promotionRepo = promotionRepo;
    }
    async create(vendorId, vertical, dto) {
        const promotion = this.promotionRepo.create({
            ...dto,
            vendorId,
            vertical,
        });
        return this.promotionRepo.save(promotion);
    }
    async findAllByVendor(vendorId, vertical) {
        return this.promotionRepo.find({
            where: { vendorId, vertical },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id, vendorId) {
        const promotion = await this.promotionRepo.findOne({
            where: { id, vendorId },
        });
        if (!promotion)
            throw new common_1.NotFoundException('Promotion not found');
        return promotion;
    }
    async update(id, vendorId, dto) {
        const promotion = await this.findOne(id, vendorId);
        Object.assign(promotion, dto);
        return this.promotionRepo.save(promotion);
    }
    async remove(id, vendorId) {
        const promotion = await this.findOne(id, vendorId);
        await this.promotionRepo.remove(promotion);
    }
};
exports.PromotionsService = PromotionsService;
exports.PromotionsService = PromotionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(promotion_entity_1.Promotion)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PromotionsService);
//# sourceMappingURL=promotions.service.js.map