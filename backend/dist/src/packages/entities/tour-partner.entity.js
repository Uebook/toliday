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
exports.TourPartner = exports.PartnerStatus = void 0;
const typeorm_1 = require("typeorm");
const staff_entity_1 = require("../../staff/entities/staff.entity");
const tour_entity_1 = require("./tour.entity");
const tour_package_entity_1 = require("./tour-package.entity");
const lead_entity_1 = require("./lead.entity");
var PartnerStatus;
(function (PartnerStatus) {
    PartnerStatus["PENDING"] = "PENDING";
    PartnerStatus["APPROVED"] = "APPROVED";
    PartnerStatus["REJECTED"] = "REJECTED";
    PartnerStatus["BLOCKED"] = "BLOCKED";
})(PartnerStatus || (exports.PartnerStatus = PartnerStatus = {}));
let TourPartner = class TourPartner {
    id;
    name;
    businessName;
    businessType;
    website;
    yearsInOperation;
    city;
    operatingArea;
    address;
    email;
    contactNumber;
    gstNumber;
    panNumber;
    registrationNumber;
    gstDoc;
    panDoc;
    licenseDoc;
    chequeDoc;
    bankHolder;
    bankName;
    bankAccount;
    bankIfsc;
    isVerified;
    status;
    staffs;
    leads;
    tours;
    packages;
    createdAt;
    updatedAt;
};
exports.TourPartner = TourPartner;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TourPartner.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TourPartner.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TourPartner.prototype, "businessName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TourPartner.prototype, "businessType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TourPartner.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TourPartner.prototype, "yearsInOperation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TourPartner.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TourPartner.prototype, "operatingArea", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TourPartner.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], TourPartner.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TourPartner.prototype, "contactNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TourPartner.prototype, "gstNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TourPartner.prototype, "panNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TourPartner.prototype, "registrationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TourPartner.prototype, "gstDoc", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TourPartner.prototype, "panDoc", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TourPartner.prototype, "licenseDoc", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TourPartner.prototype, "chequeDoc", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TourPartner.prototype, "bankHolder", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TourPartner.prototype, "bankName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TourPartner.prototype, "bankAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TourPartner.prototype, "bankIfsc", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], TourPartner.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PartnerStatus,
        default: PartnerStatus.PENDING,
    }),
    __metadata("design:type", String)
], TourPartner.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => staff_entity_1.Staff, (staff) => staff.tourPartner),
    __metadata("design:type", Array)
], TourPartner.prototype, "staffs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lead_entity_1.Lead, (lead) => lead.partner),
    __metadata("design:type", Array)
], TourPartner.prototype, "leads", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tour_entity_1.Tour, (tour) => tour.partner),
    __metadata("design:type", Array)
], TourPartner.prototype, "tours", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tour_package_entity_1.TourPackage, (tp) => tp.partner),
    __metadata("design:type", Array)
], TourPartner.prototype, "packages", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TourPartner.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TourPartner.prototype, "updatedAt", void 0);
exports.TourPartner = TourPartner = __decorate([
    (0, typeorm_1.Entity)('tour_partners')
], TourPartner);
//# sourceMappingURL=tour-partner.entity.js.map