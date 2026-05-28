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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const global_setting_entity_1 = require("./entities/global-setting.entity");
let SettingsService = class SettingsService {
    settingsRepo;
    constructor(settingsRepo) {
        this.settingsRepo = settingsRepo;
    }
    async onModuleInit() {
        const defaults = [
            {
                key: 'COMMISSION_HOTEL',
                value: '10',
                category: 'FINANCE',
                description: 'Default commission % for hotel bookings',
            },
            {
                key: 'COMMISSION_PACKAGE',
                value: '12',
                category: 'FINANCE',
                description: 'Default commission % for tour packages',
            },
            {
                key: 'COMMISSION_BUS',
                value: '5',
                category: 'FINANCE',
                description: 'Default commission % for bus tickets',
            },
            {
                key: 'COMMISSION_CAB',
                value: '8',
                category: 'FINANCE',
                description: 'Default commission % for cab rentals',
            },
            {
                key: 'TAX_GST',
                value: '18',
                category: 'FINANCE',
                description: 'Standard GST % for services',
            },
        ];
        for (const item of defaults) {
            const existing = await this.settingsRepo.findOne({
                where: { key: item.key },
            });
            if (!existing) {
                await this.settingsRepo.save(this.settingsRepo.create(item));
            }
        }
    }
    async findAll() {
        return this.settingsRepo.find();
    }
    async findByCategory(category) {
        return this.settingsRepo.find({ where: { category } });
    }
    async updateMany(settings) {
        for (const item of settings) {
            await this.settingsRepo.update({ key: item.key }, { value: item.value });
        }
        return { success: true };
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(global_setting_entity_1.GlobalSetting)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SettingsService);
//# sourceMappingURL=settings.service.js.map