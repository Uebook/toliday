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
exports.Tour = exports.TourStatus = void 0;
const typeorm_1 = require("typeorm");
const tour_partner_entity_1 = require("./tour-partner.entity");
var TourStatus;
(function (TourStatus) {
    TourStatus["ACTIVE"] = "ACTIVE";
    TourStatus["DRAFT"] = "DRAFT";
    TourStatus["INACTIVE"] = "INACTIVE";
})(TourStatus || (exports.TourStatus = TourStatus = {}));
let Tour = class Tour {
    id;
    title;
    description;
    location;
    duration;
    basePrice;
    maxCapacity;
    includes;
    excludes;
    itinerary;
    status;
    partnerId;
    partner;
    createdAt;
    updatedAt;
};
exports.Tour = Tour;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Tour.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tour.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Tour.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tour.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tour.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Tour.prototype, "basePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Tour.prototype, "maxCapacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Tour.prototype, "includes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Tour.prototype, "excludes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Tour.prototype, "itinerary", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TourStatus,
        default: TourStatus.DRAFT,
    }),
    __metadata("design:type", String)
], Tour.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tour.prototype, "partnerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tour_partner_entity_1.TourPartner, (partner) => partner.tours, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'partnerId' }),
    __metadata("design:type", tour_partner_entity_1.TourPartner)
], Tour.prototype, "partner", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Tour.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Tour.prototype, "updatedAt", void 0);
exports.Tour = Tour = __decorate([
    (0, typeorm_1.Entity)('tours')
], Tour);
//# sourceMappingURL=tour.entity.js.map