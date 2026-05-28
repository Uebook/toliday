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
exports.SeatLayout = exports.SeatType = exports.DeckType = void 0;
const typeorm_1 = require("typeorm");
const bus_entity_1 = require("./bus.entity");
var DeckType;
(function (DeckType) {
    DeckType["LOWER"] = "LOWER";
    DeckType["UPPER"] = "UPPER";
})(DeckType || (exports.DeckType = DeckType = {}));
var SeatType;
(function (SeatType) {
    SeatType["SEATER"] = "SEATER";
    SeatType["SLEEPER"] = "SLEEPER";
    SeatType["SEMI_SLEEPER"] = "SEMI_SLEEPER";
})(SeatType || (exports.SeatType = SeatType = {}));
let SeatLayout = class SeatLayout {
    id;
    busId;
    bus;
    deck;
    row;
    column;
    seatType;
    seatName;
    isLadiesSeat;
    isActive;
    createdAt;
    updatedAt;
};
exports.SeatLayout = SeatLayout;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SeatLayout.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SeatLayout.prototype, "busId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bus_entity_1.Bus, (bus) => bus.seatLayouts, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'busId' }),
    __metadata("design:type", bus_entity_1.Bus)
], SeatLayout.prototype, "bus", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: DeckType,
        default: DeckType.LOWER,
    }),
    __metadata("design:type", String)
], SeatLayout.prototype, "deck", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], SeatLayout.prototype, "row", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], SeatLayout.prototype, "column", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: SeatType,
        default: SeatType.SEATER,
    }),
    __metadata("design:type", String)
], SeatLayout.prototype, "seatType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SeatLayout.prototype, "seatName", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], SeatLayout.prototype, "isLadiesSeat", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], SeatLayout.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SeatLayout.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SeatLayout.prototype, "updatedAt", void 0);
exports.SeatLayout = SeatLayout = __decorate([
    (0, typeorm_1.Entity)('bus_seat_layouts')
], SeatLayout);
//# sourceMappingURL=seat-layout.entity.js.map