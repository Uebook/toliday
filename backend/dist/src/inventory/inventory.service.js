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
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const inventory_entity_1 = require("./entities/inventory.entity");
const room_type_entity_1 = require("../room-type/entities/room-type.entity");
let InventoryService = class InventoryService {
    inventoryRepository;
    constructor(inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }
    async bulkUpdate(hotelId, updateDto) {
        const { roomTypeId, startDate, endDate, totalRooms, priceOverride } = updateDto;
        const roomType = await this.inventoryRepository.manager
            .getRepository(room_type_entity_1.RoomType)
            .findOne({
            where: { id: roomTypeId, hotelId },
        });
        if (!roomType) {
            throw new common_1.NotFoundException(`Room type not found for this hotel.`);
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        const recordsToSave = [];
        for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
            const dateStr = dt.toISOString().split('T')[0];
            let inventory = await this.inventoryRepository.findOne({
                where: { roomTypeId, date: dateStr },
            });
            if (!inventory) {
                inventory = this.inventoryRepository.create({
                    roomTypeId,
                    date: dateStr,
                    totalRooms,
                    availableRooms: totalRooms,
                    priceOverride,
                });
            }
            else {
                const booked = inventory.totalRooms - inventory.availableRooms;
                inventory.totalRooms = totalRooms;
                inventory.availableRooms = Math.max(0, totalRooms - booked);
                if (priceOverride !== undefined) {
                    inventory.priceOverride = priceOverride;
                }
            }
            recordsToSave.push(inventory);
        }
        await this.inventoryRepository.save(recordsToSave);
        return { message: `Updated inventory for ${recordsToSave.length} days.` };
    }
    async getInventory(hotelId, startDate, endDate) {
        return this.inventoryRepository
            .createQueryBuilder('inv')
            .innerJoin('inv.roomType', 'roomType')
            .where('roomType.hotelId = :hotelId', { hotelId })
            .andWhere('inv.date >= :startDate', { startDate })
            .andWhere('inv.date <= :endDate', { endDate })
            .getMany();
    }
    async reduceInventory(roomTypeId, startDate, endDate, count, manager) {
        const repo = manager
            ? manager.getRepository(inventory_entity_1.Inventory)
            : this.inventoryRepository;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const records = [];
        for (let dt = new Date(start); dt < end; dt.setDate(dt.getDate() + 1)) {
            const dateStr = dt.toISOString().split('T')[0];
            const inv = await repo.findOne({
                where: { roomTypeId, date: dateStr },
                lock: { mode: 'pessimistic_write' },
            });
            if (!inv || inv.availableRooms < count) {
                throw new common_1.BadRequestException(`Rooms not available for date: ${dateStr}`);
            }
            inv.availableRooms -= count;
            records.push(inv);
        }
        await repo.save(records);
    }
    async increaseInventory(roomTypeId, startDate, endDate, count, manager) {
        const repo = manager
            ? manager.getRepository(inventory_entity_1.Inventory)
            : this.inventoryRepository;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const records = [];
        for (let dt = new Date(start); dt < end; dt.setDate(dt.getDate() + 1)) {
            const dateStr = dt.toISOString().split('T')[0];
            const inv = await repo.findOne({ where: { roomTypeId, date: dateStr } });
            if (inv) {
                inv.availableRooms += count;
                records.push(inv);
            }
        }
        await repo.save(records);
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inventory_entity_1.Inventory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map