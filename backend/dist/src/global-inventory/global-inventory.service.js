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
exports.GlobalInventoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const global_inventory_entity_1 = require("./entities/global-inventory.entity");
let GlobalInventoryService = class GlobalInventoryService {
    invRepo;
    constructor(invRepo) {
        this.invRepo = invRepo;
    }
    async findAllAdmin(vertical) {
        const where = vertical ? { vertical } : {};
        return this.invRepo.find({
            where,
            order: { date: 'DESC' },
        });
    }
    async findByVendor(vendorId, vertical) {
        const where = { vendorId };
        if (vertical)
            where.vertical = vertical;
        return this.invRepo.find({
            where,
            order: { date: 'DESC' },
        });
    }
    async updateInventory(id, updateData) {
        await this.invRepo.update(id, updateData);
        return this.invRepo.findOne({ where: { id } });
    }
};
exports.GlobalInventoryService = GlobalInventoryService;
exports.GlobalInventoryService = GlobalInventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(global_inventory_entity_1.GlobalInventory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GlobalInventoryService);
//# sourceMappingURL=global-inventory.service.js.map