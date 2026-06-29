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
exports.Housekeeping = exports.HousekeepingStatus = void 0;
const typeorm_1 = require("typeorm");
const staff_entity_1 = require("../../staff/entities/staff.entity");
const room_type_entity_1 = require("../../room-type/entities/room-type.entity");
var HousekeepingStatus;
(function (HousekeepingStatus) {
    HousekeepingStatus["CLEAN"] = "CLEAN";
    HousekeepingStatus["DIRTY"] = "DIRTY";
    HousekeepingStatus["MAINTENANCE"] = "MAINTENANCE";
    HousekeepingStatus["OUT_OF_ORDER"] = "OUT_OF_ORDER";
})(HousekeepingStatus || (exports.HousekeepingStatus = HousekeepingStatus = {}));
let Housekeeping = class Housekeeping {
    id;
    hotelId;
    roomNumber;
    roomTypeId;
    roomType;
    status;
    assignedStaffId;
    assignedStaff;
    createdAt;
    updatedAt;
};
exports.Housekeeping = Housekeeping;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Housekeeping.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Housekeeping.prototype, "hotelId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Housekeeping.prototype, "roomNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Housekeeping.prototype, "roomTypeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => room_type_entity_1.RoomType, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'roomTypeId' }),
    __metadata("design:type", room_type_entity_1.RoomType)
], Housekeeping.prototype, "roomType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        default: HousekeepingStatus.DIRTY,
    }),
    __metadata("design:type", String)
], Housekeeping.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Housekeeping.prototype, "assignedStaffId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.Staff, { onDelete: 'SET NULL', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'assignedStaffId' }),
    __metadata("design:type", staff_entity_1.Staff)
], Housekeeping.prototype, "assignedStaff", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Housekeeping.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Housekeeping.prototype, "updatedAt", void 0);
exports.Housekeeping = Housekeeping = __decorate([
    (0, typeorm_1.Entity)('housekeeping_records')
], Housekeeping);
//# sourceMappingURL=housekeeping.entity.js.map