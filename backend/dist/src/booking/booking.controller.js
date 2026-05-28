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
exports.BookingController = exports.PublicBookingController = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const create_booking_dto_1 = require("./dto/create-booking.dto");
const update_booking_status_dto_1 = require("./dto/update-booking-status.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let PublicBookingController = class PublicBookingController {
    bookingService;
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    createPublic(body) {
        return this.bookingService.createPublic(body);
    }
    findAllByEmail(email) {
        return this.bookingService.findAllByEmail(email);
    }
};
exports.PublicBookingController = PublicBookingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PublicBookingController.prototype, "createPublic", null);
__decorate([
    (0, common_1.Get)(':email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PublicBookingController.prototype, "findAllByEmail", null);
exports.PublicBookingController = PublicBookingController = __decorate([
    (0, common_1.Controller)('public/bookings'),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], PublicBookingController);
let BookingController = class BookingController {
    bookingService;
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    create(req, createDto) {
        const hotelId = req.user.hotelId;
        return this.bookingService.create(hotelId, createDto);
    }
    findAll(req) {
        if (req.user.tourPartnerId) {
            return this.bookingService.findAllForTourPartner(req.user.tourPartnerId);
        }
        return this.bookingService.findAll(req.user.hotelId);
    }
    findOne(req, id) {
        if (req.user.tourPartnerId) {
            return this.bookingService.findOneForTourPartner(id, req.user.tourPartnerId);
        }
        return this.bookingService.findOne(id, req.user.hotelId);
    }
    updateStatus(req, id, updateDto) {
        if (req.user.tourPartnerId) {
            return this.bookingService.updateStatusForTourPartner(id, req.user.tourPartnerId, updateDto.status);
        }
        return this.bookingService.updateStatus(id, req.user.hotelId, updateDto);
    }
    assignRoom(req, id, roomId) {
        return this.bookingService.assignRoom(id, req.user.hotelId, roomId);
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_booking_dto_1.CreateBookingDto]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_booking_status_dto_1.UpdateBookingStatusDto]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Patch)(':id/assign-room'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "assignRoom", null);
exports.BookingController = BookingController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('bookings'),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
//# sourceMappingURL=booking.controller.js.map