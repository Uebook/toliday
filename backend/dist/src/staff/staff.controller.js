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
exports.StaffController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const staff_service_1 = require("./staff.service");
let StaffController = class StaffController {
    staffService;
    constructor(staffService) {
        this.staffService = staffService;
    }
    findAll(req, hotelId) {
        if (req.user.tourPartnerId) {
            return this.staffService.findAll('', req.user.tourPartnerId);
        }
        if (req.user.busVendorId) {
            return this.staffService.findAll('', '', req.user.busVendorId);
        }
        if (req.user.cabVendorId) {
            return this.staffService.findAll('', '', '', req.user.cabVendorId);
        }
        return this.staffService.findAll(hotelId || req.user.hotelId);
    }
    getAttendance(req) {
        return this.staffService.getAttendance(req.user.hotelId);
    }
    clockInOut(req, staffId, action) {
        return this.staffService.clockInOut(req.user.hotelId, staffId, action);
    }
    findOne(id) {
        return this.staffService.findOne(id);
    }
    create(req, body) {
        console.log('[DEBUG] StaffController.create Request:', {
            user: req.user,
            body,
        });
        if (req.user.tourPartnerId) {
            return this.staffService.create(req.user.tourPartnerId, 'tour', body);
        }
        if (req.user.busVendorId) {
            return this.staffService.create(req.user.busVendorId, 'bus', body);
        }
        if (req.user.cabVendorId) {
            return this.staffService.create(req.user.cabVendorId, 'cab', body);
        }
        const { hotelId, ...rest } = body;
        return this.staffService.create(hotelId || req.user.hotelId, 'hotel', rest);
    }
    update(id, body) {
        return this.staffService.update(id, body);
    }
    remove(id) {
        return this.staffService.remove(id);
    }
    resetPassword(id, password) {
        return this.staffService.resetPassword(id, password);
    }
};
exports.StaffController = StaffController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('hotelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('attendance/all'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "getAttendance", null);
__decorate([
    (0, common_1.Post)('attendance/clock'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('staffId')),
    __param(2, (0, common_1.Body)('action')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "clockInOut", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/reset-password'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "resetPassword", null);
exports.StaffController = StaffController = __decorate([
    (0, common_1.Controller)('staff'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [staff_service_1.StaffService])
], StaffController);
//# sourceMappingURL=staff.controller.js.map