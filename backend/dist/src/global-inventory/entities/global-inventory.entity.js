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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalInventory = exports.VerticalType = void 0;
const typeorm_1 = require("typeorm");
var VerticalType;
(function (VerticalType) {
    VerticalType["HOTEL"] = "HOTEL";
    VerticalType["PACKAGE"] = "PACKAGE";
    VerticalType["BUS"] = "BUS";
    VerticalType["CAB"] = "CAB";
})(VerticalType || (exports.VerticalType = VerticalType = {}));
let GlobalInventory = class GlobalInventory {
    id;
    vendorId;
    vertical;
    resourceId;
    resourceName;
    date;
    totalUnits;
    availableUnits;
    basePrice;
    priceOverride;
    createdAt;
    updatedAt;
};
exports.GlobalInventory = GlobalInventory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], GlobalInventory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GlobalInventory.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: VerticalType,
    }),
    __metadata("design:type", String)
], GlobalInventory.prototype, "vertical", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GlobalInventory.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GlobalInventory.prototype, "resourceName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], GlobalInventory.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], GlobalInventory.prototype, "totalUnits", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], GlobalInventory.prototype, "availableUnits", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], GlobalInventory.prototype, "basePrice", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], GlobalInventory.prototype, "priceOverride", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], GlobalInventory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], GlobalInventory.prototype, "updatedAt", void 0);
exports.GlobalInventory = GlobalInventory = __decorate([
    (0, typeorm_1.Entity)('global_inventories')
], GlobalInventory);
//# sourceMappingURL=global-inventory.entity.js.map