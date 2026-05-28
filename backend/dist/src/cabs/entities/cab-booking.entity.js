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
exports.CabBooking = exports.CabBookingStatus = void 0;
const typeorm_1 = require("typeorm");
const cab_vendor_entity_1 = require("./cab-vendor.entity");
const vehicle_entity_1 = require("./vehicle.entity");
const driver_entity_1 = require("./driver.entity");
var CabBookingStatus;
(function (CabBookingStatus) {
    CabBookingStatus["PENDING"] = "PENDING";
    CabBookingStatus["CONFIRMED"] = "CONFIRMED";
    CabBookingStatus["ONGOING"] = "ONGOING";
    CabBookingStatus["COMPLETED"] = "COMPLETED";
    CabBookingStatus["CANCELLED"] = "CANCELLED";
})(CabBookingStatus || (exports.CabBookingStatus = CabBookingStatus = {}));
let CabBooking = class CabBooking {
    id;
    bookingId;
    customerName;
    customerPhone;
    pickupLocation;
    dropLocation;
    pickupDateTime;
    totalAmount;
    status;
    vendorId;
    vendor;
    vehicleId;
    vehicle;
    driverId;
    driver;
    isSettled;
    commissionAmount;
    netAmount;
    createdAt;
    updatedAt;
};
exports.CabBooking = CabBooking;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CabBooking.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], CabBooking.prototype, "bookingId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CabBooking.prototype, "customerName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CabBooking.prototype, "customerPhone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CabBooking.prototype, "pickupLocation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CabBooking.prototype, "dropLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], CabBooking.prototype, "pickupDateTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], CabBooking.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CabBookingStatus,
        default: CabBookingStatus.PENDING,
    }),
    __metadata("design:type", String)
], CabBooking.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CabBooking.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cab_vendor_entity_1.CabVendor, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'vendorId' }),
    __metadata("design:type", cab_vendor_entity_1.CabVendor)
], CabBooking.prototype, "vendor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CabBooking.prototype, "vehicleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vehicle_entity_1.Vehicle, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'vehicleId' }),
    __metadata("design:type", vehicle_entity_1.Vehicle)
], CabBooking.prototype, "vehicle", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CabBooking.prototype, "driverId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => driver_entity_1.Driver, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'driverId' }),
    __metadata("design:type", driver_entity_1.Driver)
], CabBooking.prototype, "driver", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], CabBooking.prototype, "isSettled", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], CabBooking.prototype, "commissionAmount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], CabBooking.prototype, "netAmount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CabBooking.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CabBooking.prototype, "updatedAt", void 0);
exports.CabBooking = CabBooking = __decorate([
    (0, typeorm_1.Entity)('cab_bookings')
], CabBooking);
//# sourceMappingURL=cab-booking.entity.js.map