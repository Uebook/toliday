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
exports.PromotionsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const promotions_service_1 = require("./promotions.service");
const vertical_enum_1 = require("../common/enums/vertical.enum");
let PromotionsController = class PromotionsController {
    promotionsService;
    constructor(promotionsService) {
        this.promotionsService = promotionsService;
    }
    extractVendorContext(req) {
        if (req.user.hotelId)
            return { vendorId: req.user.hotelId, vertical: vertical_enum_1.VerticalType.HOTEL };
        if (req.user.tourPartnerId)
            return {
                vendorId: req.user.tourPartnerId,
                vertical: vertical_enum_1.VerticalType.PACKAGE,
            };
        if (req.user.busVendorId)
            return { vendorId: req.user.busVendorId, vertical: vertical_enum_1.VerticalType.BUS };
        if (req.user.cabVendorId)
            return { vendorId: req.user.cabVendorId, vertical: vertical_enum_1.VerticalType.CAB };
        throw new Error('Could not determine vendor vertical');
    }
    create(req, body) {
        const { vendorId, vertical } = this.extractVendorContext(req);
        return this.promotionsService.create(vendorId, vertical, body);
    }
    findAll(req) {
        const { vendorId, vertical } = this.extractVendorContext(req);
        return this.promotionsService.findAllByVendor(vendorId, vertical);
    }
    findOne(req, id) {
        const { vendorId } = this.extractVendorContext(req);
        return this.promotionsService.findOne(id, vendorId);
    }
    update(req, id, body) {
        const { vendorId } = this.extractVendorContext(req);
        return this.promotionsService.update(id, vendorId, body);
    }
    remove(req, id) {
        const { vendorId } = this.extractVendorContext(req);
        return this.promotionsService.remove(id, vendorId);
    }
};
exports.PromotionsController = PromotionsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PromotionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PromotionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PromotionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], PromotionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PromotionsController.prototype, "remove", null);
exports.PromotionsController = PromotionsController = __decorate([
    (0, common_1.Controller)('promotions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [promotions_service_1.PromotionsService])
], PromotionsController);
//# sourceMappingURL=promotions.controller.js.map