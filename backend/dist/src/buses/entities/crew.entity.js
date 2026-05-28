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
exports.Crew = exports.CrewRole = void 0;
const typeorm_1 = require("typeorm");
const bus_vendor_entity_1 = require("./bus-vendor.entity");
const bus_schedule_entity_1 = require("./bus-schedule.entity");
var CrewRole;
(function (CrewRole) {
    CrewRole["DRIVER"] = "DRIVER";
    CrewRole["CONDUCTOR"] = "CONDUCTOR";
})(CrewRole || (exports.CrewRole = CrewRole = {}));
let Crew = class Crew {
    id;
    name;
    role;
    phone;
    licenseNumber;
    licenseExpiry;
    aadharNumber;
    vendorId;
    vendor;
    drivenSchedules;
    conductedSchedules;
    isActive;
    createdAt;
    updatedAt;
};
exports.Crew = Crew;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Crew.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Crew.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CrewRole,
        default: CrewRole.DRIVER,
    }),
    __metadata("design:type", String)
], Crew.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Crew.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Crew.prototype, "licenseNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Crew.prototype, "licenseExpiry", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Crew.prototype, "aadharNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Crew.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bus_vendor_entity_1.BusVendor, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'vendorId' }),
    __metadata("design:type", bus_vendor_entity_1.BusVendor)
], Crew.prototype, "vendor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bus_schedule_entity_1.BusSchedule, (schedule) => schedule.driver),
    __metadata("design:type", Array)
], Crew.prototype, "drivenSchedules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bus_schedule_entity_1.BusSchedule, (schedule) => schedule.conductor),
    __metadata("design:type", Array)
], Crew.prototype, "conductedSchedules", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Crew.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Crew.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Crew.prototype, "updatedAt", void 0);
exports.Crew = Crew = __decorate([
    (0, typeorm_1.Entity)('bus_crew')
], Crew);
//# sourceMappingURL=crew.entity.js.map