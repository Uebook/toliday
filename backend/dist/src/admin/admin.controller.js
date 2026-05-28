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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const hotel_entity_1 = require("../hotel/entities/hotel.entity");
const tour_partner_entity_1 = require("../packages/entities/tour-partner.entity");
const bus_vendor_entity_1 = require("../buses/entities/bus-vendor.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    getStats() {
        return this.adminService.getDashboardStats();
    }
    processSettlements() {
        return this.adminService.processSettlements();
    }
    updatePromotionStatus(id, isVerified) {
        return this.adminService.updatePromotionStatus(id, isVerified);
    }
    findAllHotels(status) {
        return this.adminService.findAllHotels(status);
    }
    findHotelById(id) {
        return this.adminService.findHotelById(id);
    }
    updateHotelStatus(id, status) {
        return this.adminService.updateHotelStatus(id, status);
    }
    addHotelRoom(hotelId, data) {
        return this.adminService.addHotelRoom(hotelId, data);
    }
    deleteHotelRoom(roomId) {
        return this.adminService.deleteHotelRoom(roomId);
    }
    findAllTourPartners(status) {
        return this.adminService.findAllTourPartners(status);
    }
    findTourPartnerById(id) {
        return this.adminService.findTourPartnerById(id);
    }
    updateTourPartnerStatus(id, status) {
        return this.adminService.updateTourPartnerStatus(id, status);
    }
    addTourPackage(partnerId, data) {
        return this.adminService.addTourPackage(partnerId, data);
    }
    deleteTourPackage(packageId) {
        return this.adminService.deleteTourPackage(packageId);
    }
    findAllBusVendors(status) {
        return this.adminService.findAllBusVendors(status);
    }
    findBusVendorById(id) {
        return this.adminService.findBusVendorById(id);
    }
    updateBusVendorStatus(id, status) {
        return this.adminService.updateBusVendorStatus(id, status);
    }
    addBusFleet(vendorId, data) {
        return this.adminService.addBusFleet(vendorId, data);
    }
    deleteBusFleet(busId) {
        return this.adminService.deleteBusFleet(busId);
    }
    findAllCabVendors() {
        return this.adminService.findAllCabVendors();
    }
    findCabVendorById(id) {
        return this.adminService.findCabVendorById(id);
    }
    updateCabVendorVerification(id, isVerified) {
        return this.adminService.updateCabVendorVerification(id, isVerified);
    }
    addCabVehicle(vendorId, data) {
        return this.adminService.addCabVehicle(vendorId, data);
    }
    deleteCabVehicle(vehicleId) {
        return this.adminService.deleteCabVehicle(vehicleId);
    }
    findAllBookings() {
        return this.adminService.findAllBookings();
    }
    findAllUsers() {
        return this.adminService.findAllUsers();
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getStats", null);
__decorate([
    (0, common_1.Post)('finance/settle'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "processSettlements", null);
__decorate([
    (0, common_1.Patch)('promotions/:id/verify'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('isVerified')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updatePromotionStatus", null);
__decorate([
    (0, common_1.Get)('hotels'),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAllHotels", null);
__decorate([
    (0, common_1.Get)('hotels/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findHotelById", null);
__decorate([
    (0, common_1.Patch)('hotels/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateHotelStatus", null);
__decorate([
    (0, common_1.Post)('hotels/:id/rooms'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "addHotelRoom", null);
__decorate([
    (0, common_1.Delete)('hotels/rooms/:roomId'),
    __param(0, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteHotelRoom", null);
__decorate([
    (0, common_1.Get)('tour-partners'),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAllTourPartners", null);
__decorate([
    (0, common_1.Get)('tour-partners/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findTourPartnerById", null);
__decorate([
    (0, common_1.Patch)('tour-partners/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateTourPartnerStatus", null);
__decorate([
    (0, common_1.Post)('tour-partners/:id/packages'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "addTourPackage", null);
__decorate([
    (0, common_1.Delete)('tour-partners/packages/:packageId'),
    __param(0, (0, common_1.Param)('packageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteTourPackage", null);
__decorate([
    (0, common_1.Get)('buses'),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAllBusVendors", null);
__decorate([
    (0, common_1.Get)('buses/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findBusVendorById", null);
__decorate([
    (0, common_1.Patch)('buses/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateBusVendorStatus", null);
__decorate([
    (0, common_1.Post)('buses/:id/fleet'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "addBusFleet", null);
__decorate([
    (0, common_1.Delete)('buses/fleet/:busId'),
    __param(0, (0, common_1.Param)('busId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteBusFleet", null);
__decorate([
    (0, common_1.Get)('cabs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAllCabVendors", null);
__decorate([
    (0, common_1.Get)('cabs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findCabVendorById", null);
__decorate([
    (0, common_1.Patch)('cabs/:id/verify'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('isVerified')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateCabVendorVerification", null);
__decorate([
    (0, common_1.Post)('cabs/:id/vehicles'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "addCabVehicle", null);
__decorate([
    (0, common_1.Delete)('cabs/vehicles/:vehicleId'),
    __param(0, (0, common_1.Param)('vehicleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteCabVehicle", null);
__decorate([
    (0, common_1.Get)('bookings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAllBookings", null);
__decorate([
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAllUsers", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map