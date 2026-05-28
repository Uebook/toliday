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
exports.CabsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const cabs_service_1 = require("./cabs.service");
let CabsController = class CabsController {
    cabsService;
    constructor(cabsService) {
        this.cabsService = cabsService;
    }
    getProfile(req) {
        return this.cabsService.findVendorById(req.user.cabVendorId);
    }
    updateProfile(req, data) {
        return this.cabsService.updateVendor(req.user.cabVendorId, data);
    }
    getFleet(req) {
        return this.cabsService.findVehicles(req.user.cabVendorId);
    }
    createVehicle(req, data) {
        return this.cabsService.createVehicle(req.user.cabVendorId, data);
    }
    updateVehicle(req, id, data) {
        return this.cabsService.updateVehicle(id, req.user.cabVendorId, data);
    }
    deleteVehicle(req, id) {
        return this.cabsService.deleteVehicle(id, req.user.cabVendorId);
    }
    getDrivers(req) {
        return this.cabsService.findDrivers(req.user.cabVendorId);
    }
    createDriver(req, data) {
        return this.cabsService.createDriver(req.user.cabVendorId, data);
    }
    updateDriver(req, id, data) {
        return this.cabsService.updateDriver(id, req.user.cabVendorId, data);
    }
    deleteDriver(req, id) {
        return this.cabsService.deleteDriver(id, req.user.cabVendorId);
    }
    getPricing(req) {
        return this.cabsService.findPricing(req.user.cabVendorId);
    }
    createPricing(req, data) {
        return this.cabsService.createPricing(req.user.cabVendorId, data);
    }
    deletePricing(req, id) {
        return this.cabsService.deletePricing(id, req.user.cabVendorId);
    }
    getBookings(req) {
        return this.cabsService.findBookings(req.user.cabVendorId);
    }
    updateBookingStatus(req, id, status) {
        return this.cabsService.updateBookingStatus(id, req.user.cabVendorId, status);
    }
    getStats(req) {
        return this.cabsService.getStats(req.user.cabVendorId);
    }
};
exports.CabsController = CabsController;
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CabsController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Patch)('profile'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CabsController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('fleet'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CabsController.prototype, "getFleet", null);
__decorate([
    (0, common_1.Post)('fleet'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CabsController.prototype, "createVehicle", null);
__decorate([
    (0, common_1.Patch)('fleet/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], CabsController.prototype, "updateVehicle", null);
__decorate([
    (0, common_1.Delete)('fleet/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CabsController.prototype, "deleteVehicle", null);
__decorate([
    (0, common_1.Get)('drivers'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CabsController.prototype, "getDrivers", null);
__decorate([
    (0, common_1.Post)('drivers'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CabsController.prototype, "createDriver", null);
__decorate([
    (0, common_1.Patch)('drivers/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], CabsController.prototype, "updateDriver", null);
__decorate([
    (0, common_1.Delete)('drivers/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CabsController.prototype, "deleteDriver", null);
__decorate([
    (0, common_1.Get)('pricing'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CabsController.prototype, "getPricing", null);
__decorate([
    (0, common_1.Post)('pricing'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CabsController.prototype, "createPricing", null);
__decorate([
    (0, common_1.Delete)('pricing/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CabsController.prototype, "deletePricing", null);
__decorate([
    (0, common_1.Get)('bookings'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CabsController.prototype, "getBookings", null);
__decorate([
    (0, common_1.Patch)('bookings/:id/status'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], CabsController.prototype, "updateBookingStatus", null);
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CabsController.prototype, "getStats", null);
exports.CabsController = CabsController = __decorate([
    (0, common_1.Controller)('cabs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [cabs_service_1.CabsService])
], CabsController);
//# sourceMappingURL=cabs.controller.js.map