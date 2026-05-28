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
exports.Vehicle = exports.VehicleCategory = void 0;
const typeorm_1 = require("typeorm");
const cab_vendor_entity_1 = require("./cab-vendor.entity");
var VehicleCategory;
(function (VehicleCategory) {
    VehicleCategory["HATCHBACK"] = "HATCHBACK";
    VehicleCategory["SEDAN"] = "SEDAN";
    VehicleCategory["SUV"] = "SUV";
    VehicleCategory["PREMIUM_SUV"] = "PREMIUM_SUV";
    VehicleCategory["LUXURY"] = "LUXURY";
    VehicleCategory["TEMPO_TRAVELLER"] = "TEMPO_TRAVELLER";
})(VehicleCategory || (exports.VehicleCategory = VehicleCategory = {}));
let Vehicle = class Vehicle {
    id;
    registrationNumber;
    make;
    model;
    year;
    category;
    seatingCapacity;
    hasAC;
    rcDocumentUrl;
    insuranceDocumentUrl;
    permitDocumentUrl;
    verificationStatus;
    isActive;
    vendorId;
    vendor;
    createdAt;
    updatedAt;
};
exports.Vehicle = Vehicle;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Vehicle.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehicle.prototype, "registrationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehicle.prototype, "make", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehicle.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Vehicle.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: VehicleCategory,
        default: VehicleCategory.SEDAN,
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 4 }),
    __metadata("design:type", Number)
], Vehicle.prototype, "seatingCapacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Vehicle.prototype, "hasAC", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "rcDocumentUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "insuranceDocumentUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "permitDocumentUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'PENDING' }),
    __metadata("design:type", String)
], Vehicle.prototype, "verificationStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Vehicle.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehicle.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cab_vendor_entity_1.CabVendor, (vendor) => vendor.vehicles, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'vendorId' }),
    __metadata("design:type", cab_vendor_entity_1.CabVendor)
], Vehicle.prototype, "vendor", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Vehicle.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Vehicle.prototype, "updatedAt", void 0);
exports.Vehicle = Vehicle = __decorate([
    (0, typeorm_1.Entity)('cab_vehicles')
], Vehicle);
//# sourceMappingURL=vehicle.entity.js.map