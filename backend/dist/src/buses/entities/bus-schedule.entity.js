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
exports.BusSchedule = exports.ScheduleStatus = void 0;
const typeorm_1 = require("typeorm");
const bus_entity_1 = require("./bus.entity");
const bus_route_entity_1 = require("./bus-route.entity");
const crew_entity_1 = require("./crew.entity");
const bus_booking_entity_1 = require("./bus-booking.entity");
var ScheduleStatus;
(function (ScheduleStatus) {
    ScheduleStatus["SCHEDULED"] = "SCHEDULED";
    ScheduleStatus["IN_TRANSIT"] = "IN_TRANSIT";
    ScheduleStatus["COMPLETED"] = "COMPLETED";
    ScheduleStatus["CANCELLED"] = "CANCELLED";
})(ScheduleStatus || (exports.ScheduleStatus = ScheduleStatus = {}));
let BusSchedule = class BusSchedule {
    id;
    departureDate;
    departureTime;
    arrivalTime;
    baseFare;
    busId;
    bus;
    routeId;
    route;
    driverId;
    driver;
    conductorId;
    conductor;
    status;
    weekendSurge;
    lastMinuteDiscount;
    bookings;
    seatsBooked;
    isActive;
    createdAt;
    updatedAt;
};
exports.BusSchedule = BusSchedule;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BusSchedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], BusSchedule.prototype, "departureDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], BusSchedule.prototype, "departureTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], BusSchedule.prototype, "arrivalTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], BusSchedule.prototype, "baseFare", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusSchedule.prototype, "busId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bus_entity_1.Bus, (bus) => bus.schedules, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'busId' }),
    __metadata("design:type", bus_entity_1.Bus)
], BusSchedule.prototype, "bus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusSchedule.prototype, "routeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bus_route_entity_1.BusRoute, (route) => route.schedules, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'routeId' }),
    __metadata("design:type", bus_route_entity_1.BusRoute)
], BusSchedule.prototype, "route", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusSchedule.prototype, "driverId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => crew_entity_1.Crew, (crew) => crew.drivenSchedules, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'driverId' }),
    __metadata("design:type", crew_entity_1.Crew)
], BusSchedule.prototype, "driver", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BusSchedule.prototype, "conductorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => crew_entity_1.Crew, (crew) => crew.conductedSchedules, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'conductorId' }),
    __metadata("design:type", crew_entity_1.Crew)
], BusSchedule.prototype, "conductor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ScheduleStatus,
        default: ScheduleStatus.SCHEDULED,
    }),
    __metadata("design:type", String)
], BusSchedule.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], BusSchedule.prototype, "weekendSurge", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], BusSchedule.prototype, "lastMinuteDiscount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bus_booking_entity_1.BusBooking, (booking) => booking.schedule),
    __metadata("design:type", Array)
], BusSchedule.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], BusSchedule.prototype, "seatsBooked", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], BusSchedule.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BusSchedule.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BusSchedule.prototype, "updatedAt", void 0);
exports.BusSchedule = BusSchedule = __decorate([
    (0, typeorm_1.Entity)('bus_schedules')
], BusSchedule);
//# sourceMappingURL=bus-schedule.entity.js.map