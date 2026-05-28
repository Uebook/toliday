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
exports.HotelService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hotel_entity_1 = require("./entities/hotel.entity");
const rate_plan_entity_1 = require("./entities/rate-plan.entity");
const review_entity_1 = require("./entities/review.entity");
let HotelService = class HotelService {
    hotelRepository;
    ratePlanRepository;
    reviewRepository;
    constructor(hotelRepository, ratePlanRepository, reviewRepository) {
        this.hotelRepository = hotelRepository;
        this.ratePlanRepository = ratePlanRepository;
        this.reviewRepository = reviewRepository;
    }
    async findById(id) {
        const hotel = await this.hotelRepository.findOne({ where: { id } });
        if (!hotel)
            throw new common_1.NotFoundException('Hotel not found');
        return hotel;
    }
    async findAllPublic() {
        return this.hotelRepository.find({
            where: { status: hotel_entity_1.HotelStatus.APPROVED },
        });
    }
    async findByIdPublic(id) {
        const hotel = await this.hotelRepository.findOne({
            where: { id, status: hotel_entity_1.HotelStatus.APPROVED },
            relations: ['roomTypes', 'roomTypes.ratePlans', 'reviews'],
        });
        if (!hotel)
            throw new common_1.NotFoundException('Hotel not found');
        return hotel;
    }
    async findByEmail(email) {
        return this.hotelRepository.findOne({ where: { email } });
    }
    async update(id, dto) {
        await this.hotelRepository.update(id, dto);
        return this.findById(id);
    }
    async createRatePlan(dto) {
        const plan = this.ratePlanRepository.create(dto);
        return this.ratePlanRepository.save(plan);
    }
    async findRatePlansByRoom(roomTypeId) {
        return this.ratePlanRepository.find({ where: { roomTypeId } });
    }
    async updateRatePlan(id, dto) {
        await this.ratePlanRepository.update(id, dto);
        const plan = await this.ratePlanRepository.findOne({ where: { id } });
        if (!plan)
            throw new common_1.NotFoundException('Rate Plan not found');
        return plan;
    }
    async deleteRatePlan(id) {
        const result = await this.ratePlanRepository.delete(id);
        if (result.affected === 0)
            throw new common_1.NotFoundException('Rate Plan not found');
    }
    async createReview(dto) {
        const review = this.reviewRepository.create(dto);
        return this.reviewRepository.save(review);
    }
    async findReviewsByHotel(hotelId) {
        return this.reviewRepository.find({
            where: { hotelId },
            order: { createdAt: 'DESC' },
        });
    }
    async replyToReview(id, vendorReply) {
        await this.reviewRepository.update(id, {
            vendorReply,
            vendorReplyAt: new Date(),
        });
        const review = await this.reviewRepository.findOne({ where: { id } });
        if (!review)
            throw new common_1.NotFoundException('Review not found');
        return review;
    }
};
exports.HotelService = HotelService;
exports.HotelService = HotelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hotel_entity_1.Hotel)),
    __param(1, (0, typeorm_1.InjectRepository)(rate_plan_entity_1.RatePlan)),
    __param(2, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], HotelService);
//# sourceMappingURL=hotel.service.js.map