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
exports.HousekeepingController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const housekeeping_service_1 = require("./housekeeping.service");
let HousekeepingController = class HousekeepingController {
    housekeepingService;
    constructor(housekeepingService) {
        this.housekeepingService = housekeepingService;
    }
    findAll(req) {
        const hotelId = req.user.hotelId;
        return this.housekeepingService.findAll(hotelId);
    }
    create(req, body) {
        const hotelId = req.user.hotelId;
        return this.housekeepingService.create(hotelId, body);
    }
    update(req, id, body) {
        const hotelId = req.user.hotelId;
        return this.housekeepingService.update(id, hotelId, body);
    }
    remove(req, id) {
        const hotelId = req.user.hotelId;
        return this.housekeepingService.remove(id, hotelId);
    }
};
exports.HousekeepingController = HousekeepingController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HousekeepingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], HousekeepingController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], HousekeepingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], HousekeepingController.prototype, "remove", null);
exports.HousekeepingController = HousekeepingController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('housekeeping'),
    __metadata("design:paramtypes", [housekeeping_service_1.HousekeepingService])
], HousekeepingController);
//# sourceMappingURL=housekeeping.controller.js.map