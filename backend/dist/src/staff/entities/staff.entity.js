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
exports.Staff = exports.StaffRole = void 0;
const typeorm_1 = require("typeorm");
const hotel_entity_1 = require("../../hotel/entities/hotel.entity");
const tour_partner_entity_1 = require("../../packages/entities/tour-partner.entity");
const bus_vendor_entity_1 = require("../../buses/entities/bus-vendor.entity");
const cab_vendor_entity_1 = require("../../cabs/entities/cab-vendor.entity");
var StaffRole;
(function (StaffRole) {
    StaffRole["OWNER"] = "OWNER";
    StaffRole["ADMIN"] = "ADMIN";
    StaffRole["MANAGER"] = "MANAGER";
    StaffRole["RECEPTIONIST"] = "RECEPTIONIST";
})(StaffRole || (exports.StaffRole = StaffRole = {}));
let Staff = class Staff {
    id;
    name;
    email;
    passwordHash;
    phone;
    role;
    isActive;
    lastLogin;
    permissions;
    twoFactorEnabled;
    emailNotifications;
    smsNotifications;
    hotelId;
    hotel;
    tourPartnerId;
    tourPartner;
    busVendorId;
    busVendor;
    cabVendorId;
    cabVendor;
    createdAt;
    updatedAt;
};
exports.Staff = Staff;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Staff.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Staff.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Staff.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Staff.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: StaffRole,
        default: StaffRole.RECEPTIONIST,
    }),
    __metadata("design:type", String)
], Staff.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Staff.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Staff.prototype, "lastLogin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true, default: {} }),
    __metadata("design:type", Object)
], Staff.prototype, "permissions", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Staff.prototype, "twoFactorEnabled", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Staff.prototype, "emailNotifications", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Staff.prototype, "smsNotifications", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "hotelId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hotel_entity_1.Hotel, (hotel) => hotel.staffs, {
        onDelete: 'CASCADE',
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'hotelId' }),
    __metadata("design:type", hotel_entity_1.Hotel)
], Staff.prototype, "hotel", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "tourPartnerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tour_partner_entity_1.TourPartner, (partner) => partner.staffs, {
        onDelete: 'CASCADE',
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'tourPartnerId' }),
    __metadata("design:type", tour_partner_entity_1.TourPartner)
], Staff.prototype, "tourPartner", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "busVendorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bus_vendor_entity_1.BusVendor, (vendor) => vendor.staffs, {
        onDelete: 'CASCADE',
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'busVendorId' }),
    __metadata("design:type", bus_vendor_entity_1.BusVendor)
], Staff.prototype, "busVendor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "cabVendorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cab_vendor_entity_1.CabVendor, { onDelete: 'CASCADE', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'cabVendorId' }),
    __metadata("design:type", cab_vendor_entity_1.CabVendor)
], Staff.prototype, "cabVendor", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Staff.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Staff.prototype, "updatedAt", void 0);
exports.Staff = Staff = __decorate([
    (0, typeorm_1.Entity)('staffs')
], Staff);
//# sourceMappingURL=staff.entity.js.map