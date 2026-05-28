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
exports.RoomType = void 0;
const typeorm_1 = require("typeorm");
const hotel_entity_1 = require("../../hotel/entities/hotel.entity");
const inventory_entity_1 = require("../../inventory/entities/inventory.entity");
const booking_entity_1 = require("../../booking/entities/booking.entity");
const rate_plan_entity_1 = require("../../hotel/entities/rate-plan.entity");
const room_entity_1 = require("../../room/entities/room.entity");
let RoomType = class RoomType {
    id;
    name;
    description;
    price;
    capacity;
    extraPersonPrice;
    size;
    amenities;
    images;
    totalRooms;
    hotelId;
    hotel;
    inventories;
    bookings;
    ratePlans;
    rooms;
    createdAt;
    updatedAt;
};
exports.RoomType = RoomType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RoomType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoomType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], RoomType.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], RoomType.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], RoomType.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], RoomType.prototype, "extraPersonPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], RoomType.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], RoomType.prototype, "amenities", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], RoomType.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 10 }),
    __metadata("design:type", Number)
], RoomType.prototype, "totalRooms", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoomType.prototype, "hotelId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hotel_entity_1.Hotel, (hotel) => hotel.roomTypes, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'hotelId' }),
    __metadata("design:type", hotel_entity_1.Hotel)
], RoomType.prototype, "hotel", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inventory_entity_1.Inventory, (inventory) => inventory.roomType),
    __metadata("design:type", Array)
], RoomType.prototype, "inventories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => booking_entity_1.Booking, (booking) => booking.roomType),
    __metadata("design:type", Array)
], RoomType.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rate_plan_entity_1.RatePlan, (ratePlan) => ratePlan.roomType),
    __metadata("design:type", Array)
], RoomType.prototype, "ratePlans", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => room_entity_1.Room, (room) => room.roomType),
    __metadata("design:type", Array)
], RoomType.prototype, "rooms", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RoomType.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RoomType.prototype, "updatedAt", void 0);
exports.RoomType = RoomType = __decorate([
    (0, typeorm_1.Entity)('room_types')
], RoomType);
//# sourceMappingURL=room-type.entity.js.map