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
exports.PackageDeparture = void 0;
const typeorm_1 = require("typeorm");
const tour_package_entity_1 = require("./tour-package.entity");
let PackageDeparture = class PackageDeparture {
    id;
    date;
    totalSeats;
    availableSeats;
    isActive;
    packageId;
    tourPackage;
    createdAt;
    updatedAt;
};
exports.PackageDeparture = PackageDeparture;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PackageDeparture.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], PackageDeparture.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], PackageDeparture.prototype, "totalSeats", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], PackageDeparture.prototype, "availableSeats", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], PackageDeparture.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PackageDeparture.prototype, "packageId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tour_package_entity_1.TourPackage, (tourPackage) => tourPackage.departures, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'packageId' }),
    __metadata("design:type", tour_package_entity_1.TourPackage)
], PackageDeparture.prototype, "tourPackage", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PackageDeparture.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PackageDeparture.prototype, "updatedAt", void 0);
exports.PackageDeparture = PackageDeparture = __decorate([
    (0, typeorm_1.Entity)('package_departures')
], PackageDeparture);
//# sourceMappingURL=package-departure.entity.js.map