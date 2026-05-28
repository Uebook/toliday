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
exports.BusesController = void 0;
const common_1 = require("@nestjs/common");
const buses_service_1 = require("./buses.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let BusesController = class BusesController {
    busesService;
    constructor(busesService) {
        this.busesService = busesService;
    }
    getStats(req) {
        return this.busesService.getStats(req.user.busVendorId);
    }
    getProfile(req) {
        return this.busesService.findVendorById(req.user.busVendorId);
    }
    updateProfile(req, data) {
        return this.busesService.updateVendor(req.user.busVendorId, data);
    }
    findAllVendors() {
        return this.busesService.findAllVendors();
    }
    findVendorById(id) {
        return this.busesService.findVendorById(id);
    }
    createVendor(data) {
        return this.busesService.createVendor(data);
    }
    findBusesByVendor(vendorId) {
        return this.busesService.findBusesByVendor(vendorId);
    }
    createBus(data) {
        return this.busesService.createBus(data);
    }
    findAllRoutes() {
        return this.busesService.findAllRoutes();
    }
    createRoute(data) {
        return this.busesService.createRoute(data);
    }
    findSchedulesByRoute(routeId) {
        return this.busesService.findSchedulesByRoute(routeId);
    }
    createSchedule(data) {
        return this.busesService.createSchedule(data);
    }
    findSeatLayout(busId) {
        return this.busesService.findSeatLayout(busId);
    }
    saveSeatLayout(busId, layouts) {
        return this.busesService.saveSeatLayout(busId, layouts);
    }
    findCrewByVendor(vendorId) {
        return this.busesService.findCrewByVendor(vendorId);
    }
    createCrewMember(data) {
        return this.busesService.createCrewMember(data);
    }
    findBookingsBySchedule(scheduleId) {
        return this.busesService.findBookingsBySchedule(scheduleId);
    }
    createBooking(data) {
        return this.busesService.createBooking(data);
    }
    findYieldRules(busId) {
        return this.busesService.findYieldRulesByBus(busId);
    }
    createYieldRule(busId, data) {
        return this.busesService.createYieldRule(busId, data);
    }
};
exports.BusesController = BusesController;
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BusesController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BusesController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('profile'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BusesController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('vendors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BusesController.prototype, "findAllVendors", null);
__decorate([
    (0, common_1.Get)('vendors/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BusesController.prototype, "findVendorById", null);
__decorate([
    (0, common_1.Post)('vendors'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BusesController.prototype, "createVendor", null);
__decorate([
    (0, common_1.Get)('vendors/:vendorId/buses'),
    __param(0, (0, common_1.Param)('vendorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BusesController.prototype, "findBusesByVendor", null);
__decorate([
    (0, common_1.Post)('buses'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BusesController.prototype, "createBus", null);
__decorate([
    (0, common_1.Get)('routes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BusesController.prototype, "findAllRoutes", null);
__decorate([
    (0, common_1.Post)('routes'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BusesController.prototype, "createRoute", null);
__decorate([
    (0, common_1.Get)('routes/:routeId/schedules'),
    __param(0, (0, common_1.Param)('routeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BusesController.prototype, "findSchedulesByRoute", null);
__decorate([
    (0, common_1.Post)('schedules'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BusesController.prototype, "createSchedule", null);
__decorate([
    (0, common_1.Get)('buses/:busId/layouts'),
    __param(0, (0, common_1.Param)('busId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BusesController.prototype, "findSeatLayout", null);
__decorate([
    (0, common_1.Post)('buses/:busId/layouts'),
    __param(0, (0, common_1.Param)('busId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", void 0)
], BusesController.prototype, "saveSeatLayout", null);
__decorate([
    (0, common_1.Get)('vendors/:vendorId/crew'),
    __param(0, (0, common_1.Param)('vendorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BusesController.prototype, "findCrewByVendor", null);
__decorate([
    (0, common_1.Post)('crew'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BusesController.prototype, "createCrewMember", null);
__decorate([
    (0, common_1.Get)('schedules/:scheduleId/bookings'),
    __param(0, (0, common_1.Param)('scheduleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BusesController.prototype, "findBookingsBySchedule", null);
__decorate([
    (0, common_1.Post)('bookings'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BusesController.prototype, "createBooking", null);
__decorate([
    (0, common_1.Get)('buses/:busId/yield-rules'),
    __param(0, (0, common_1.Param)('busId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BusesController.prototype, "findYieldRules", null);
__decorate([
    (0, common_1.Post)('buses/:busId/yield-rules'),
    __param(0, (0, common_1.Param)('busId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BusesController.prototype, "createYieldRule", null);
exports.BusesController = BusesController = __decorate([
    (0, common_1.Controller)('buses'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [buses_service_1.BusesService])
], BusesController);
//# sourceMappingURL=buses.controller.js.map