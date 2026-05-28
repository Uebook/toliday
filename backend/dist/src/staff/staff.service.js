"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const staff_entity_1 = require("./entities/staff.entity");
const hotel_entity_1 = require("../hotel/entities/hotel.entity");
const mail_service_1 = require("../mail/mail.service");
const bcrypt = __importStar(require("bcrypt"));
let StaffService = class StaffService {
    staffRepository;
    hotelRepository;
    mailService;
    constructor(staffRepository, hotelRepository, mailService) {
        this.staffRepository = staffRepository;
        this.hotelRepository = hotelRepository;
        this.mailService = mailService;
    }
    async findAll(hotelId, tourPartnerId, busVendorId, cabVendorId) {
        const where = {};
        if (tourPartnerId)
            where.tourPartnerId = tourPartnerId;
        else if (busVendorId)
            where.busVendorId = busVendorId;
        else if (cabVendorId)
            where.cabVendorId = cabVendorId;
        else if (hotelId)
            where.hotelId = hotelId;
        const list = await this.staffRepository.find({
            where,
            order: { createdAt: 'ASC' },
        });
        return list.map((s) => this.sanitize(s));
    }
    async findOne(id) {
        const s = await this.staffRepository.findOne({ where: { id } });
        if (!s)
            throw new common_1.NotFoundException('Staff member not found');
        return this.sanitize(s);
    }
    async create(partnerId, type, dto) {
        try {
            console.log('[DEBUG] Staff Creation Request:', {
                partnerId,
                type,
                email: dto.email,
                role: dto.role,
            });
            if (!partnerId) {
                console.error('[ERROR] PartnerId is missing in staff creation');
                throw new common_1.BadRequestException('Partner ID is missing. Please re-login.');
            }
            const existing = await this.staffRepository.findOne({
                where: { email: dto.email },
            });
            if (existing) {
                console.warn('[WARN] Email already in use:', dto.email);
                throw new common_1.BadRequestException('A staff member with this email already exists.');
            }
            const passwordHash = await bcrypt.hash(dto.password, 10);
            let role = staff_entity_1.StaffRole.RECEPTIONIST;
            if (dto.role) {
                const upper = dto.role.toUpperCase();
                if (upper === 'STAFF') {
                    role = staff_entity_1.StaffRole.RECEPTIONIST;
                }
                else if (Object.values(staff_entity_1.StaffRole).includes(upper)) {
                    role = upper;
                }
            }
            const staffData = {
                name: dto.name,
                email: dto.email,
                passwordHash,
                phone: dto.phone,
                role,
                permissions: dto.permissions ?? {},
            };
            if (type === 'hotel')
                staffData.hotelId = partnerId;
            else if (type === 'tour')
                staffData.tourPartnerId = partnerId;
            else if (type === 'bus')
                staffData.busVendorId = partnerId;
            else if (type === 'cab')
                staffData.cabVendorId = partnerId;
            const staff = new staff_entity_1.Staff();
            Object.assign(staff, staffData);
            const saved = await this.staffRepository.save(staff);
            console.log('[SUCCESS] Staff member created:', saved.id);
            try {
                await this.mailService.sendStaffInvite(dto.email, dto.name, 'Toliday Portal');
            }
            catch (error) {
                console.error('Failed to send staff invite email:', error);
            }
            return this.sanitize(saved);
        }
        catch (err) {
            console.error('[CRITICAL] Staff Creation Failed:', err.message);
            throw err;
        }
    }
    async remove(id) {
        const staff = await this.staffRepository.findOne({ where: { id } });
        if (!staff)
            throw new common_1.NotFoundException('Staff member not found');
        if (staff.role === staff_entity_1.StaffRole.OWNER) {
            throw new common_1.BadRequestException('Cannot delete the hotel owner.');
        }
        await this.staffRepository.remove(staff);
        return { message: 'Staff member deleted successfully' };
    }
    async resetPassword(id, password) {
        const staff = await this.staffRepository.findOne({ where: { id } });
        if (!staff)
            throw new common_1.NotFoundException('Staff member not found');
        const passwordHash = await bcrypt.hash(password, 10);
        await this.staffRepository.update(id, { passwordHash });
        return { message: 'Password reset successfully' };
    }
    async update(id, dto) {
        if (dto.role) {
            const upper = dto.role.toUpperCase();
            if (upper === 'STAFF') {
                dto.role = staff_entity_1.StaffRole.RECEPTIONIST;
            }
            else if (Object.values(staff_entity_1.StaffRole).includes(upper)) {
                dto.role = upper;
            }
        }
        await this.staffRepository.update(id, dto);
        return this.findOne(id);
    }
    async deactivate(id) {
        await this.staffRepository.update(id, { isActive: false });
        return { message: 'Staff member deactivated' };
    }
    sanitize(s) {
        const { passwordHash: _, ...rest } = s;
        return rest;
    }
};
exports.StaffService = StaffService;
exports.StaffService = StaffService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(staff_entity_1.Staff)),
    __param(1, (0, typeorm_1.InjectRepository)(hotel_entity_1.Hotel)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        mail_service_1.MailService])
], StaffService);
//# sourceMappingURL=staff.service.js.map