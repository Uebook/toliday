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
exports.Bus = exports.BusType = void 0;
const typeorm_1 = require("typeorm");
const bus_vendor_entity_1 = require("./bus-vendor.entity");
const bus_schedule_entity_1 = require("./bus-schedule.entity");
const seat_layout_entity_1 = require("./seat-layout.entity");
const yield_rule_entity_1 = require("./yield-rule.entity");
var BusType;
(function (BusType) {
    BusType["AC_SLEEPER"] = "AC_SLEEPER";
    BusType["NON_AC_SLEEPER"] = "NON_AC_SLEEPER";
    BusType["AC_SEATER"] = "AC_SEATER";
    BusType["NON_AC_SEATER"] = "NON_AC_SEATER";
    BusType["VOLVO_AC_SEATER"] = "VOLVO_AC_SEATER";
})(BusType || (exports.BusType = BusType = {}));
let Bus = class Bus {
    id;
    registrationNumber;
    type;
    totalSeats;
    amenities;
    vendorId;
    vendor;
    schedules;
    seatLayouts;
    yieldRules;
    gpsDeviceId;
    gpsProvider;
    isActive;
    createdAt;
    updatedAt;
};
exports.Bus = Bus;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Bus.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Bus.prototype, "registrationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: BusType,
        default: BusType.AC_SEATER,
    }),
    __metadata("design:type", String)
], Bus.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Bus.prototype, "totalSeats", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Bus.prototype, "amenities", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Bus.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bus_vendor_entity_1.BusVendor, (vendor) => vendor.buses, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'vendorId' }),
    __metadata("design:type", bus_vendor_entity_1.BusVendor)
], Bus.prototype, "vendor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bus_schedule_entity_1.BusSchedule, (schedule) => schedule.bus),
    __metadata("design:type", Array)
], Bus.prototype, "schedules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => seat_layout_entity_1.SeatLayout, (layout) => layout.bus),
    __metadata("design:type", Array)
], Bus.prototype, "seatLayouts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => yield_rule_entity_1.YieldRule, (rule) => rule.bus),
    __metadata("design:type", Array)
], Bus.prototype, "yieldRules", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Bus.prototype, "gpsDeviceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Bus.prototype, "gpsProvider", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Bus.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Bus.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Bus.prototype, "updatedAt", void 0);
exports.Bus = Bus = __decorate([
    (0, typeorm_1.Entity)('buses')
], Bus);
//# sourceMappingURL=bus.entity.js.map