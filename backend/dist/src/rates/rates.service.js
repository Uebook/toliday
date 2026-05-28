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
exports.RatesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rate_entity_1 = require("./entities/rate.entity");
let RatesService = class RatesService {
    ratesRepository;
    constructor(ratesRepository) {
        this.ratesRepository = ratesRepository;
    }
    findAll(hotelId) {
        return this.ratesRepository.find({
            where: { hotelId },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const rate = await this.ratesRepository.findOne({ where: { id } });
        if (!rate)
            throw new common_1.NotFoundException('Rate not found');
        return rate;
    }
    create(hotelId, dto) {
        const rate = this.ratesRepository.create({ ...dto, hotelId });
        return this.ratesRepository.save(rate);
    }
    async update(id, dto) {
        await this.ratesRepository.update(id, dto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.ratesRepository.delete(id);
        return { message: 'Rate deleted' };
    }
    findAllForTourPartner(tourPartnerId) {
        return this.ratesRepository.find({
            where: { tourPartnerId },
            order: { createdAt: 'DESC' },
        });
    }
    async findOneForTourPartner(id, tourPartnerId) {
        const rate = await this.ratesRepository.findOne({
            where: { id, tourPartnerId },
        });
        if (!rate)
            throw new common_1.NotFoundException('Rate not found');
        return rate;
    }
    async createForTourPartner(tourPartnerId, dto) {
        const rate = this.ratesRepository.create({ ...dto, tourPartnerId });
        return this.ratesRepository.save(rate);
    }
};
exports.RatesService = RatesService;
exports.RatesService = RatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rate_entity_1.Rate)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RatesService);
//# sourceMappingURL=rates.service.js.map