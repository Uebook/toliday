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
exports.BusVendor = exports.BusVendorStatus = void 0;
const typeorm_1 = require("typeorm");
const staff_entity_1 = require("../../staff/entities/staff.entity");
const bus_entity_1 = require("./bus.entity");
var BusVendorStatus;
(function (BusVendorStatus) {
    BusVendorStatus["PENDING"] = "PENDING";
    BusVendorStatus["APPROVED"] = "APPROVED";
    BusVendorStatus["REJECTED"] = "REJECTED";
    BusVendorStatus["BLOCKED"] = "BLOCKED";
})(BusVendorStatus || (exports.BusVendorStatus = BusVendorStatus = {}));
let BusVendor = class BusVendor {
    id;
    name;
    description;
    address;
    city;
    pinCode;
    contactNumber;
    website;
    email;
    cancellationPolicy;
    luggagePolicy;
    ownerFirstName;
    ownerLastName;
    ownerPhone;
    businessName;
    businessType;
    gstNumber;
    panNumber;
    gstDoc;
    panDoc;
    licenseDoc;
    bankHolder;
    bankName;
    bankAccount;
    bankIfsc;
    isVerified;
    apiKey;
    webhookUrl;
    commissionPercentage;
    gstInvoicingEnabled;
    status;
    staffs;
    buses;
    createdAt;
    updatedAt;
};
exports.BusVendor = BusVendor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BusVendor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BusVendor.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "pinCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "contactNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], BusVendor.prototype, "cancellationPolicy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], BusVendor.prototype, "luggagePolicy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "ownerFirstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "ownerLastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "ownerPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "businessName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "businessType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "gstNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "panNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "gstDoc", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "panDoc", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "licenseDoc", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "bankHolder", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "bankName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "bankAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "bankIfsc", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], BusVendor.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "apiKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusVendor.prototype, "webhookUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], BusVendor.prototype, "commissionPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], BusVendor.prototype, "gstInvoicingEnabled", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: BusVendorStatus,
        default: BusVendorStatus.PENDING,
    }),
    __metadata("design:type", String)
], BusVendor.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => staff_entity_1.Staff, (staff) => staff.busVendor),
    __metadata("design:type", Array)
], BusVendor.prototype, "staffs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bus_entity_1.Bus, (bus) => bus.vendor),
    __metadata("design:type", Array)
], BusVendor.prototype, "buses", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BusVendor.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BusVendor.prototype, "updatedAt", void 0);
exports.BusVendor = BusVendor = __decorate([
    (0, typeorm_1.Entity)('bus_vendors')
], BusVendor);
//# sourceMappingURL=bus-vendor.entity.js.map