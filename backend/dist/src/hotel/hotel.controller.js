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
exports.HotelController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const hotel_service_1 = require("./hotel.service");
const promotions_service_1 = require("../promotions/promotions.service");
const vertical_enum_1 = require("../common/enums/vertical.enum");
let HotelController = class HotelController {
    hotelService;
    promotionsService;
    constructor(hotelService, promotionsService) {
        this.hotelService = hotelService;
        this.promotionsService = promotionsService;
    }
    findMyHotel(req) {
        return this.hotelService.findById(req.user.hotelId);
    }
    updateMyHotel(req, body) {
        return this.hotelService.update(req.user.hotelId, body);
    }
    createRatePlan(body) {
        return this.hotelService.createRatePlan(body);
    }
    findRatePlansByRoom(id) {
        return this.hotelService.findRatePlansByRoom(id);
    }
    updateRatePlan(id, body) {
        return this.hotelService.updateRatePlan(id, body);
    }
    deleteRatePlan(id) {
        return this.hotelService.deleteRatePlan(id);
    }
    findMyReviews(req) {
        return this.hotelService.findReviewsByHotel(req.user.hotelId);
    }
    replyToReview(id, reply) {
        return this.hotelService.replyToReview(id, reply);
    }
    reportReview(id) {
        return this.hotelService.reportReview(id);
    }
    findMyPromotions(req) {
        return this.promotionsService.findAllByVendor(req.user.hotelId, vertical_enum_1.VerticalType.HOTEL);
    }
    createPromotion(req, body) {
        return this.promotionsService.create(req.user.hotelId, vertical_enum_1.VerticalType.HOTEL, body);
    }
};
exports.HotelController = HotelController;
__decorate([
    (0, common_1.Get)('my-hotel'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HotelController.prototype, "findMyHotel", null);
__decorate([
    (0, common_1.Patch)('my-hotel'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HotelController.prototype, "updateMyHotel", null);
__decorate([
    (0, common_1.Post)('rate-plans'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HotelController.prototype, "createRatePlan", null);
__decorate([
    (0, common_1.Get)('rooms/:id/rate-plans'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HotelController.prototype, "findRatePlansByRoom", null);
__decorate([
    (0, common_1.Patch)('rate-plans/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], HotelController.prototype, "updateRatePlan", null);
__decorate([
    (0, common_1.Delete)('rate-plans/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HotelController.prototype, "deleteRatePlan", null);
__decorate([
    (0, common_1.Get)('my-hotel/reviews'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HotelController.prototype, "findMyReviews", null);
__decorate([
    (0, common_1.Patch)('reviews/:id/reply'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('reply')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], HotelController.prototype, "replyToReview", null);
__decorate([
    (0, common_1.Patch)('reviews/:id/report-abuse'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HotelController.prototype, "reportReview", null);
__decorate([
    (0, common_1.Get)('my-hotel/promotions'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HotelController.prototype, "findMyPromotions", null);
__decorate([
    (0, common_1.Post)('my-hotel/promotions'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HotelController.prototype, "createPromotion", null);
exports.HotelController = HotelController = __decorate([
    (0, common_1.Controller)('hotel'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [hotel_service_1.HotelService,
        promotions_service_1.PromotionsService])
], HotelController);
//# sourceMappingURL=hotel.controller.js.map