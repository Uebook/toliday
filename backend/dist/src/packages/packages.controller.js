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
exports.PackagesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const packages_service_1 = require("./packages.service");
let PackagesController = class PackagesController {
    packagesService;
    constructor(packagesService) {
        this.packagesService = packagesService;
    }
    getProfile(req) {
        return this.packagesService.getProfile(req.user.tourPartnerId);
    }
    updateProfile(req, data) {
        return this.packagesService.updateProfile(req.user.tourPartnerId, data);
    }
    getAllPackages(req) {
        return this.packagesService.getTourPackages(req.user.tourPartnerId);
    }
    getPackage(req, id) {
        return this.packagesService.findOnePackage(id, req.user.tourPartnerId);
    }
    createPackage(req, data) {
        console.log('[DEBUG] PackagesController.createPackage', {
            partnerId: req.user.tourPartnerId,
            data,
        });
        return this.packagesService.createTourPackage(req.user.tourPartnerId, data);
    }
    updatePackage(req, id, data) {
        return this.packagesService.updatePackage(id, req.user.tourPartnerId, data);
    }
    removePackage(req, id) {
        return this.packagesService.removePackage(id, req.user.tourPartnerId);
    }
    getItineraries(req) {
        return this.packagesService.getTourPackages(req.user.tourPartnerId);
    }
    createItinerary(req, data) {
        return this.packagesService.createTourPackage(req.user.tourPartnerId, data);
    }
    getTours(req) {
        return this.packagesService.getTours(req.user.tourPartnerId);
    }
    createTour(req, data) {
        return this.packagesService.createTour(req.user.tourPartnerId, data);
    }
    getStatsSummary(req) {
        return this.packagesService.getStatsSummary(req.user.tourPartnerId);
    }
    getPaymentStats(req) {
        return this.packagesService.getPaymentStats(req.user.tourPartnerId);
    }
    getPaymentTransactions(req) {
        return this.packagesService.getPaymentTransactions(req.user.tourPartnerId);
    }
    getLeads(req) {
        return this.packagesService.getLeads(req.user.tourPartnerId);
    }
    updateLeadStatus(id, status) {
        return this.packagesService.updateLeadStatus(id, status);
    }
    getItinerary(id) {
        return this.packagesService.getItinerary(id);
    }
    saveItinerary(id, activities) {
        return this.packagesService.saveItinerary(id, activities);
    }
    getTiers(id) {
        return this.packagesService.getTiers(id);
    }
    saveTiers(id, tiers) {
        return this.packagesService.saveTiers(id, tiers);
    }
    getDepartures(id) {
        return this.packagesService.getDepartures(id);
    }
    saveDepartures(id, departures) {
        return this.packagesService.saveDepartures(id, departures);
    }
};
exports.PackagesController = PackagesController;
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Patch)('profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "getAllPackages", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "getPackage", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "createPackage", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "updatePackage", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "removePackage", null);
__decorate([
    (0, common_1.Get)('itineraries'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "getItineraries", null);
__decorate([
    (0, common_1.Post)('itineraries'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "createItinerary", null);
__decorate([
    (0, common_1.Get)('tours'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "getTours", null);
__decorate([
    (0, common_1.Post)('tours'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "createTour", null);
__decorate([
    (0, common_1.Get)('stats/summary'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "getStatsSummary", null);
__decorate([
    (0, common_1.Get)('payments/stats'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "getPaymentStats", null);
__decorate([
    (0, common_1.Get)('payments/transactions'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "getPaymentTransactions", null);
__decorate([
    (0, common_1.Get)('leads'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "getLeads", null);
__decorate([
    (0, common_1.Patch)('leads/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "updateLeadStatus", null);
__decorate([
    (0, common_1.Get)(':id/itinerary'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "getItinerary", null);
__decorate([
    (0, common_1.Post)(':id/itinerary'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "saveItinerary", null);
__decorate([
    (0, common_1.Get)(':id/tiers'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "getTiers", null);
__decorate([
    (0, common_1.Post)(':id/tiers'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "saveTiers", null);
__decorate([
    (0, common_1.Get)(':id/departures'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "getDepartures", null);
__decorate([
    (0, common_1.Post)(':id/departures'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", void 0)
], PackagesController.prototype, "saveDepartures", null);
exports.PackagesController = PackagesController = __decorate([
    (0, common_1.Controller)('packages'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [packages_service_1.PackagesService])
], PackagesController);
//# sourceMappingURL=packages.controller.js.map