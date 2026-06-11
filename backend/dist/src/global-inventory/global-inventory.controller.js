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
exports.GlobalInventoryController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const global_inventory_service_1 = require("./global-inventory.service");
const global_inventory_entity_1 = require("./entities/global-inventory.entity");
const staff_entity_1 = require("../staff/entities/staff.entity");
let GlobalInventoryController = class GlobalInventoryController {
    inventoryService;
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
    }
    checkAdmin(req) {
        if (req.user.role !== staff_entity_1.StaffRole.ADMIN && req.user.role !== staff_entity_1.StaffRole.OWNER) {
            throw new common_1.UnauthorizedException('Admin access required');
        }
    }
    findAll(req, vertical) {
        this.checkAdmin(req);
        return this.inventoryService.findAllAdmin(vertical);
    }
    findByVendor(req, vendorId, vertical) {
        this.checkAdmin(req);
        return this.inventoryService.findByVendor(vendorId, vertical);
    }
    updateInventory(req, id, updateData) {
        this.checkAdmin(req);
        return this.inventoryService.updateInventory(id, updateData);
    }
};
exports.GlobalInventoryController = GlobalInventoryController;
__decorate([
    (0, common_1.Get)('admin/all'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('vertical')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], GlobalInventoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('admin/vendor/:vendorId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('vendorId')),
    __param(2, (0, common_1.Query)('vertical')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], GlobalInventoryController.prototype, "findByVendor", null);
__decorate([
    (0, common_1.Patch)('admin/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], GlobalInventoryController.prototype, "updateInventory", null);
exports.GlobalInventoryController = GlobalInventoryController = __decorate([
    (0, common_1.Controller)('global-inventory'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [global_inventory_service_1.GlobalInventoryService])
], GlobalInventoryController);
//# sourceMappingURL=global-inventory.controller.js.map