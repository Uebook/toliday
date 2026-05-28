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
exports.Hotel = exports.HotelStatus = void 0;
const typeorm_1 = require("typeorm");
const staff_entity_1 = require("../../staff/entities/staff.entity");
const room_type_entity_1 = require("../../room-type/entities/room-type.entity");
const booking_entity_1 = require("../../booking/entities/booking.entity");
const review_entity_1 = require("./review.entity");
var HotelStatus;
(function (HotelStatus) {
    HotelStatus["PENDING"] = "PENDING";
    HotelStatus["APPROVED"] = "APPROVED";
    HotelStatus["REJECTED"] = "REJECTED";
    HotelStatus["BLOCKED"] = "BLOCKED";
})(HotelStatus || (exports.HotelStatus = HotelStatus = {}));
let Hotel = class Hotel {
    id;
    name;
    description;
    address;
    city;
    pinCode;
    latitude;
    longitude;
    contactNumber;
    website;
    email;
    stars;
    checkInTime;
    checkOutTime;
    maxAdults;
    maxChildren;
    childPolicy;
    cancellationPolicy;
    petPolicy;
    amenities;
    images;
    ownerFirstName;
    ownerLastName;
    ownerPhone;
    businessName;
    businessType;
    gstNumber;
    panNumber;
    gstDoc;
    panDoc;
    licenseDoc;
    bankHolder;
    bankName;
    bankAccount;
    bankIfsc;
    isVerified;
    status;
    staffs;
    roomTypes;
    bookings;
    reviews;
    createdAt;
    updatedAt;
};
exports.Hotel = Hotel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Hotel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Hotel.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "pinCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal', precision: 10, scale: 7 }),
    __metadata("design:type", Number)
], Hotel.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'decimal', precision: 10, scale: 7 }),
    __metadata("design:type", Number)
], Hotel.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "contactNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Hotel.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 3 }),
    __metadata("design:type", Number)
], Hotel.prototype, "stars", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: '14:00' }),
    __metadata("design:type", String)
], Hotel.prototype, "checkInTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: '11:00' }),
    __metadata("design:type", String)
], Hotel.prototype, "checkOutTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: '4' }),
    __metadata("design:type", String)
], Hotel.prototype, "maxAdults", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: '2' }),
    __metadata("design:type", String)
], Hotel.prototype, "maxChildren", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Hotel.prototype, "childPolicy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Hotel.prototype, "cancellationPolicy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Hotel.prototype, "petPolicy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Hotel.prototype, "amenities", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], Hotel.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "ownerFirstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "ownerLastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "ownerPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "businessName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "businessType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "gstNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "panNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "gstDoc", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "panDoc", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "licenseDoc", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "bankHolder", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "bankName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "bankAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Hotel.prototype, "bankIfsc", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Hotel.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: HotelStatus,
        default: HotelStatus.PENDING,
    }),
    __metadata("design:type", String)
], Hotel.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => staff_entity_1.Staff, (staff) => staff.hotel),
    __metadata("design:type", Array)
], Hotel.prototype, "staffs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => room_type_entity_1.RoomType, (roomType) => roomType.hotel),
    __metadata("design:type", Array)
], Hotel.prototype, "roomTypes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => booking_entity_1.Booking, (booking) => booking.hotel),
    __metadata("design:type", Array)
], Hotel.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, (review) => review.hotel),
    __metadata("design:type", Array)
], Hotel.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Hotel.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Hotel.prototype, "updatedAt", void 0);
exports.Hotel = Hotel = __decorate([
    (0, typeorm_1.Entity)('hotels')
], Hotel);
//# sourceMappingURL=hotel.entity.js.map