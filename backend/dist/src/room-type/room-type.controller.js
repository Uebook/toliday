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
exports.RoomTypeController = void 0;
const common_1 = require("@nestjs/common");
const room_type_service_1 = require("./room-type.service");
const create_room_type_dto_1 = require("./dto/create-room-type.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let RoomTypeController = class RoomTypeController {
    roomTypeService;
    constructor(roomTypeService) {
        this.roomTypeService = roomTypeService;
    }
    create(req, createDto) {
        const hotelId = req.user.hotelId;
        return this.roomTypeService.create(hotelId, createDto);
    }
    findAll(req) {
        const hotelId = req.user.hotelId;
        return this.roomTypeService.findAllByHotel(hotelId);
    }
    findOne(req, id) {
        const hotelId = req.user.hotelId;
        return this.roomTypeService.findOne(id, hotelId);
    }
    remove(req, id) {
        const hotelId = req.user.hotelId;
        return this.roomTypeService.remove(id, hotelId);
    }
    update(req, id, body) {
        const hotelId = req.user.hotelId;
        return this.roomTypeService.update(id, hotelId, body);
    }
};
exports.RoomTypeController = RoomTypeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_room_type_dto_1.CreateRoomTypeDto]),
    __metadata("design:returntype", void 0)
], RoomTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoomTypeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], RoomTypeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], RoomTypeController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], RoomTypeController.prototype, "update", null);
exports.RoomTypeController = RoomTypeController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('room-types'),
    __metadata("design:paramtypes", [room_type_service_1.RoomTypeService])
], RoomTypeController);
//# sourceMappingURL=room-type.controller.js.map