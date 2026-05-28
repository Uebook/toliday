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
exports.BusRoute = void 0;
const typeorm_1 = require("typeorm");
const bus_schedule_entity_1 = require("./bus-schedule.entity");
let BusRoute = class BusRoute {
    id;
    originCity;
    destinationCity;
    distanceKm;
    estimatedDuration;
    boardingPoints;
    droppingPoints;
    schedules;
    createdAt;
    updatedAt;
};
exports.BusRoute = BusRoute;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BusRoute.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BusRoute.prototype, "originCity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BusRoute.prototype, "destinationCity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], BusRoute.prototype, "distanceKm", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusRoute.prototype, "estimatedDuration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], BusRoute.prototype, "boardingPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], BusRoute.prototype, "droppingPoints", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bus_schedule_entity_1.BusSchedule, (schedule) => schedule.route),
    __metadata("design:type", Array)
], BusRoute.prototype, "schedules", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BusRoute.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BusRoute.prototype, "updatedAt", void 0);
exports.BusRoute = BusRoute = __decorate([
    (0, typeorm_1.Entity)('bus_routes')
], BusRoute);
//# sourceMappingURL=bus-route.entity.js.map