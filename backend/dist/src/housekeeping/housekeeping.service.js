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
exports.HousekeepingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const housekeeping_entity_1 = require("./entities/housekeeping.entity");
let HousekeepingService = class HousekeepingService {
    housekeepingRepository;
    constructor(housekeepingRepository) {
        this.housekeepingRepository = housekeepingRepository;
    }
    async findAll(hotelId) {
        return this.housekeepingRepository.find({
            where: { hotelId },
            relations: ['roomType', 'assignedStaff'],
            order: { roomNumber: 'ASC' },
        });
    }
    async create(hotelId, data) {
        const record = this.housekeepingRepository.create({
            ...data,
            hotelId,
            status: data.status || housekeeping_entity_1.HousekeepingStatus.DIRTY,
        });
        return this.housekeepingRepository.save(record);
    }
    async update(id, hotelId, updateDto) {
        const record = await this.housekeepingRepository.findOne({
            where: { id, hotelId },
        });
        if (!record) {
            throw new common_1.NotFoundException(`Housekeeping record with ID ${id} not found.`);
        }
        if (updateDto.status)
            record.status = updateDto.status;
        if (updateDto.assignedStaffId !== undefined) {
            record.assignedStaffId = (updateDto.assignedStaffId === '' ? null : updateDto.assignedStaffId);
        }
        if (updateDto.roomNumber)
            record.roomNumber = updateDto.roomNumber;
        if (updateDto.roomTypeId)
            record.roomTypeId = updateDto.roomTypeId;
        return this.housekeepingRepository.save(record);
    }
    async remove(id, hotelId) {
        const result = await this.housekeepingRepository.delete({ id, hotelId });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Housekeeping record with ID ${id} not found.`);
        }
    }
};
exports.HousekeepingService = HousekeepingService;
exports.HousekeepingService = HousekeepingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(housekeeping_entity_1.Housekeeping)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HousekeepingService);
//# sourceMappingURL=housekeeping.service.js.map