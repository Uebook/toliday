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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_entity_1 = require("./entities/notification.entity");
const notification_setting_entity_1 = require("./entities/notification-setting.entity");
let NotificationsService = class NotificationsService {
    notifRepository;
    settingsRepository;
    constructor(notifRepository, settingsRepository) {
        this.notifRepository = notifRepository;
        this.settingsRepository = settingsRepository;
    }
    async getSettings(hotelId) {
        let settings = await this.settingsRepository.findOne({
            where: { hotelId },
        });
        if (!settings) {
            settings = this.settingsRepository.create({ hotelId });
            await this.settingsRepository.save(settings);
        }
        return settings;
    }
    async updateSettings(hotelId, dto) {
        const settings = await this.getSettings(hotelId);
        Object.assign(settings, dto);
        return this.settingsRepository.save(settings);
    }
    findAll(hotelId) {
        return this.notifRepository.find({
            where: { hotelId },
            order: { createdAt: 'DESC' },
        });
    }
    async create(hotelId, dto) {
        const notif = this.notifRepository.create({ ...dto, hotelId });
        return this.notifRepository.save(notif);
    }
    async markRead(id) {
        await this.notifRepository.update(id, { read: true });
        return { message: 'Marked as read' };
    }
    async markAllRead(hotelId) {
        await this.notifRepository.update({ hotelId, read: false }, { read: true });
        return { message: 'All marked as read' };
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __param(1, (0, typeorm_1.InjectRepository)(notification_setting_entity_1.NotificationSetting)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map