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
exports.CabPricing = exports.PricingModel = void 0;
const typeorm_1 = require("typeorm");
const cab_vendor_entity_1 = require("./cab-vendor.entity");
const vehicle_entity_1 = require("./vehicle.entity");
var PricingModel;
(function (PricingModel) {
    PricingModel["OUTSTATION"] = "OUTSTATION";
    PricingModel["LOCAL_RENTAL"] = "LOCAL_RENTAL";
    PricingModel["AIRPORT_TRANSFER"] = "AIRPORT_TRANSFER";
})(PricingModel || (exports.PricingModel = PricingModel = {}));
let CabPricing = class CabPricing {
    id;
    model;
    category;
    perKmRate;
    driverAllowancePerDay;
    minKmPerDay;
    packageHours;
    packageKms;
    basePackageRate;
    extraHourRate;
    extraKmRate;
    pickupLocation;
    dropLocation;
    flatRate;
    isActive;
    vendorId;
    vendor;
    createdAt;
    updatedAt;
};
exports.CabPricing = CabPricing;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CabPricing.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PricingModel,
        default: PricingModel.OUTSTATION,
    }),
    __metadata("design:type", String)
], CabPricing.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: vehicle_entity_1.VehicleCategory,
        default: vehicle_entity_1.VehicleCategory.SEDAN,
    }),
    __metadata("design:type", String)
], CabPricing.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], CabPricing.prototype, "perKmRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], CabPricing.prototype, "driverAllowancePerDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], CabPricing.prototype, "minKmPerDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], CabPricing.prototype, "packageHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], CabPricing.prototype, "packageKms", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], CabPricing.prototype, "basePackageRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], CabPricing.prototype, "extraHourRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], CabPricing.prototype, "extraKmRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CabPricing.prototype, "pickupLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CabPricing.prototype, "dropLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], CabPricing.prototype, "flatRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], CabPricing.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CabPricing.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cab_vendor_entity_1.CabVendor, (vendor) => vendor.pricingRules, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'vendorId' }),
    __metadata("design:type", cab_vendor_entity_1.CabVendor)
], CabPricing.prototype, "vendor", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CabPricing.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CabPricing.prototype, "updatedAt", void 0);
exports.CabPricing = CabPricing = __decorate([
    (0, typeorm_1.Entity)('cab_pricing')
], CabPricing);
//# sourceMappingURL=cab-pricing.entity.js.map