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
exports.FinanceController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const finance_service_1 = require("./finance.service");
const ledger_entry_entity_1 = require("./entities/ledger-entry.entity");
const staff_entity_1 = require("../staff/entities/staff.entity");
let FinanceController = class FinanceController {
    financeService;
    constructor(financeService) {
        this.financeService = financeService;
    }
    checkAdmin(req) {
        if (req.user.role !== staff_entity_1.StaffRole.ADMIN) {
            throw new common_1.UnauthorizedException('Admin access required');
        }
    }
    getAllPayouts(req) {
        this.checkAdmin(req);
        return this.financeService.findAllPayouts();
    }
    updatePayoutStatus(req, id, status) {
        this.checkAdmin(req);
        return this.financeService.updatePayoutStatus(id, status);
    }
    getGlobalLedger(req, vertical) {
        this.checkAdmin(req);
        return this.financeService.findAllLedgerEntries(vertical);
    }
    extractVendorContext(req) {
        if (req.user.hotelId)
            return { vendorId: req.user.hotelId, vertical: ledger_entry_entity_1.VerticalType.HOTEL };
        if (req.user.tourPartnerId)
            return {
                vendorId: req.user.tourPartnerId,
                vertical: ledger_entry_entity_1.VerticalType.PACKAGE,
            };
        if (req.user.busVendorId)
            return { vendorId: req.user.busVendorId, vertical: ledger_entry_entity_1.VerticalType.BUS };
        if (req.user.cabVendorId)
            return { vendorId: req.user.cabVendorId, vertical: ledger_entry_entity_1.VerticalType.CAB };
        throw new Error('Could not determine vendor vertical');
    }
    getBalances(req) {
        const { vendorId, vertical } = this.extractVendorContext(req);
        return this.financeService.getBalances(vendorId, vertical);
    }
    getLedger(req) {
        const { vendorId, vertical } = this.extractVendorContext(req);
        return this.financeService.getLedgerEntries(vendorId, vertical);
    }
    getPayouts(req) {
        const { vendorId, vertical } = this.extractVendorContext(req);
        return this.financeService.getPayoutRequests(vendorId, vertical);
    }
    requestPayout(req, amount) {
        const { vendorId, vertical } = this.extractVendorContext(req);
        return this.financeService.requestPayout(vendorId, vertical, amount);
    }
    getInvoices(req) {
        const { vendorId, vertical } = this.extractVendorContext(req);
        return this.financeService.getInvoices(vendorId, vertical);
    }
};
exports.FinanceController = FinanceController;
__decorate([
    (0, common_1.Get)('admin/payouts'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getAllPayouts", null);
__decorate([
    (0, common_1.Patch)('admin/payouts/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "updatePayoutStatus", null);
__decorate([
    (0, common_1.Get)('admin/ledger'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('vertical')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getGlobalLedger", null);
__decorate([
    (0, common_1.Get)('balances'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getBalances", null);
__decorate([
    (0, common_1.Get)('ledger'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getLedger", null);
__decorate([
    (0, common_1.Get)('payouts'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getPayouts", null);
__decorate([
    (0, common_1.Post)('payouts'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "requestPayout", null);
__decorate([
    (0, common_1.Get)('invoices'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getInvoices", null);
exports.FinanceController = FinanceController = __decorate([
    (0, common_1.Controller)('finance'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [finance_service_1.FinanceService])
], FinanceController);
//# sourceMappingURL=finance.controller.js.map