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
exports.PublicBusesController = void 0;
const common_1 = require("@nestjs/common");
const buses_service_1 = require("./buses.service");
let PublicBusesController = class PublicBusesController {
    busesService;
    constructor(busesService) {
        this.busesService = busesService;
    }
    searchBuses(origin, destination, date) {
        return this.busesService.searchPublicBuses({ origin, destination, date });
    }
    getSeatMatrix(scheduleId) {
        return this.busesService.getSeatMatrix(scheduleId);
    }
    lockSeats(data) {
        return this.busesService.lockSeats(data);
    }
};
exports.PublicBusesController = PublicBusesController;
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('origin')),
    __param(1, (0, common_1.Query)('destination')),
    __param(2, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], PublicBusesController.prototype, "searchBuses", null);
__decorate([
    (0, common_1.Get)('schedules/:id/seat-matrix'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PublicBusesController.prototype, "getSeatMatrix", null);
__decorate([
    (0, common_1.Post)('bookings/lock'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PublicBusesController.prototype, "lockSeats", null);
exports.PublicBusesController = PublicBusesController = __decorate([
    (0, common_1.Controller)('public/buses'),
    __metadata("design:paramtypes", [buses_service_1.BusesService])
], PublicBusesController);
//# sourceMappingURL=public-buses.controller.js.map