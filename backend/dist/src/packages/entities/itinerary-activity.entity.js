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
exports.ItineraryActivity = void 0;
const typeorm_1 = require("typeorm");
const tour_package_entity_1 = require("./tour-package.entity");
let ItineraryActivity = class ItineraryActivity {
    id;
    day;
    title;
    description;
    inclusions;
    images;
    packageId;
    package;
    createdAt;
    updatedAt;
};
exports.ItineraryActivity = ItineraryActivity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ItineraryActivity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], ItineraryActivity.prototype, "day", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ItineraryActivity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ItineraryActivity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], ItineraryActivity.prototype, "inclusions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], ItineraryActivity.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ItineraryActivity.prototype, "packageId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tour_package_entity_1.TourPackage, (pkg) => pkg.structuredItinerary, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'packageId' }),
    __metadata("design:type", tour_package_entity_1.TourPackage)
], ItineraryActivity.prototype, "package", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ItineraryActivity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ItineraryActivity.prototype, "updatedAt", void 0);
exports.ItineraryActivity = ItineraryActivity = __decorate([
    (0, typeorm_1.Entity)('itinerary_activities')
], ItineraryActivity);
//# sourceMappingURL=itinerary-activity.entity.js.map