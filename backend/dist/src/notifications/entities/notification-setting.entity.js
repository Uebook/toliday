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
exports.NotificationSetting = void 0;
const typeorm_1 = require("typeorm");
const hotel_entity_1 = require("../../hotel/entities/hotel.entity");
let NotificationSetting = class NotificationSetting {
    id;
    hotelId;
    hotel;
    newBookings;
    cancellations;
    paymentUpdates;
    inventoryAlerts;
    checkInReminders;
    rateSuggestions;
};
exports.NotificationSetting = NotificationSetting;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NotificationSetting.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NotificationSetting.prototype, "hotelId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => hotel_entity_1.Hotel, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'hotelId' }),
    __metadata("design:type", hotel_entity_1.Hotel)
], NotificationSetting.prototype, "hotel", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], NotificationSetting.prototype, "newBookings", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], NotificationSetting.prototype, "cancellations", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], NotificationSetting.prototype, "paymentUpdates", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], NotificationSetting.prototype, "inventoryAlerts", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], NotificationSetting.prototype, "checkInReminders", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], NotificationSetting.prototype, "rateSuggestions", void 0);
exports.NotificationSetting = NotificationSetting = __decorate([
    (0, typeorm_1.Entity)('notification_settings')
], NotificationSetting);
//# sourceMappingURL=notification-setting.entity.js.map