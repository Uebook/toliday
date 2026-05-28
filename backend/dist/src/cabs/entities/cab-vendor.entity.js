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
exports.CabVendor = void 0;
const typeorm_1 = require("typeorm");
const vehicle_entity_1 = require("./vehicle.entity");
const driver_entity_1 = require("./driver.entity");
const cab_pricing_entity_1 = require("./cab-pricing.entity");
let CabVendor = class CabVendor {
    id;
    name;
    email;
    phone;
    companyName;
    address;
    city;
    gstNumber;
    panNumber;
    isVerified;
    vehicles;
    drivers;
    pricingRules;
    createdAt;
    updatedAt;
};
exports.CabVendor = CabVendor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CabVendor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CabVendor.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], CabVendor.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CabVendor.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CabVendor.prototype, "companyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CabVendor.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CabVendor.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CabVendor.prototype, "gstNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CabVendor.prototype, "panNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], CabVendor.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vehicle_entity_1.Vehicle, (vehicle) => vehicle.vendor),
    __metadata("design:type", Array)
], CabVendor.prototype, "vehicles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => driver_entity_1.Driver, (driver) => driver.vendor),
    __metadata("design:type", Array)
], CabVendor.prototype, "drivers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cab_pricing_entity_1.CabPricing, (pricing) => pricing.vendor),
    __metadata("design:type", Array)
], CabVendor.prototype, "pricingRules", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CabVendor.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CabVendor.prototype, "updatedAt", void 0);
exports.CabVendor = CabVendor = __decorate([
    (0, typeorm_1.Entity)('cab_vendors')
], CabVendor);
//# sourceMappingURL=cab-vendor.entity.js.map