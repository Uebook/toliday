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
exports.TourPackage = exports.PackageStatus = void 0;
const typeorm_1 = require("typeorm");
const tour_partner_entity_1 = require("./tour-partner.entity");
const itinerary_activity_entity_1 = require("./itinerary-activity.entity");
const lead_entity_1 = require("./lead.entity");
const package_departure_entity_1 = require("./package-departure.entity");
const package_tier_entity_1 = require("./package-tier.entity");
var PackageStatus;
(function (PackageStatus) {
    PackageStatus["ACTIVE"] = "ACTIVE";
    PackageStatus["DRAFT"] = "DRAFT";
    PackageStatus["INACTIVE"] = "INACTIVE";
})(PackageStatus || (exports.PackageStatus = PackageStatus = {}));
let TourPackage = class TourPackage {
    id;
    title;
    description;
    destinations;
    duration;
    basePrice;
    salePrice;
    inclusions;
    exclusions;
    images;
    itinerary;
    status;
    category;
    partnerId;
    partner;
    structuredItinerary;
    leads;
    departures;
    pricingTiers;
    createdAt;
    updatedAt;
};
exports.TourPackage = TourPackage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TourPackage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TourPackage.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TourPackage.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], TourPackage.prototype, "destinations", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TourPackage.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], TourPackage.prototype, "basePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], TourPackage.prototype, "salePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], TourPackage.prototype, "inclusions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], TourPackage.prototype, "exclusions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], TourPackage.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], TourPackage.prototype, "itinerary", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PackageStatus,
        default: PackageStatus.DRAFT,
    }),
    __metadata("design:type", String)
], TourPackage.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TourPackage.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TourPackage.prototype, "partnerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tour_partner_entity_1.TourPartner, (partner) => partner.packages, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'partnerId' }),
    __metadata("design:type", tour_partner_entity_1.TourPartner)
], TourPackage.prototype, "partner", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => itinerary_activity_entity_1.ItineraryActivity, (activity) => activity.package),
    __metadata("design:type", Array)
], TourPackage.prototype, "structuredItinerary", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lead_entity_1.Lead, (lead) => lead.package),
    __metadata("design:type", Array)
], TourPackage.prototype, "leads", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => package_departure_entity_1.PackageDeparture, (departure) => departure.tourPackage),
    __metadata("design:type", Array)
], TourPackage.prototype, "departures", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => package_tier_entity_1.PackageTier, (tier) => tier.tourPackage),
    __metadata("design:type", Array)
], TourPackage.prototype, "pricingTiers", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TourPackage.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TourPackage.prototype, "updatedAt", void 0);
exports.TourPackage = TourPackage = __decorate([
    (0, typeorm_1.Entity)('tour_packages')
], TourPackage);
//# sourceMappingURL=tour-package.entity.js.map