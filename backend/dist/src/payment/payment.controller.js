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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const booking_service_1 = require("../booking/booking.service");
const buses_service_1 = require("../buses/buses.service");
let PaymentController = class PaymentController {
    paymentService;
    bookingService;
    busesService;
    constructor(paymentService, bookingService, busesService) {
        this.paymentService = paymentService;
        this.bookingService = bookingService;
        this.busesService = busesService;
    }
    async initiatePayment(body) {
        let amount = '';
        let guestName = '';
        let guestEmail = '';
        let guestContact = '';
        if (body.bookingType === 'BUS') {
            const busBooking = await this.busesService['bookingRepo'].findOne({ where: { id: body.bookingId } });
            if (!busBooking)
                throw new common_1.NotFoundException('Bus booking not found');
            amount = busBooking.totalFare.toString();
            guestName = busBooking.passengerDetails?.[0]?.name || 'Bus Guest';
            guestEmail = 'guest@example.com';
            guestContact = '';
        }
        else {
            const booking = await this.bookingService.findOne(body.bookingId, body.hotelId || '');
            if (!booking)
                throw new common_1.NotFoundException('Hotel booking not found');
            amount = booking.totalAmount.toString();
            guestName = booking.guestName;
            guestEmail = booking.guestEmail;
            guestContact = booking.guestContact || '';
        }
        const payloadObj = {
            merchant_id: this.paymentService.getMerchantId(),
            order_id: body.bookingId,
            amount: amount,
            currency: 'INR',
            redirect_url: `${process.env.BACKEND_URL || 'http://localhost:3001'}/api/public/payment/webhook`,
            cancel_url: `${process.env.BACKEND_URL || 'http://localhost:3001'}/api/public/payment/webhook`,
            language: 'EN',
            billing_name: guestName,
            billing_email: guestEmail,
            billing_tel: guestContact,
        };
        const plainText = Object.entries(payloadObj)
            .map(([k, v]) => `${k}=${v}`)
            .join('&');
        const encRequest = this.paymentService.encrypt(plainText);
        return {
            encRequest,
            access_code: this.paymentService.getAccessCode(),
            url: 'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction',
        };
    }
    async handleWebhook(body, res) {
        if (!body.encResp) {
            return res.redirect('http://localhost:3000/?status=failed');
        }
        const decryptedStr = this.paymentService.decrypt(body.encResp);
        const data = this.paymentService.parseDecryptedString(decryptedStr);
        const orderId = data['order_id'];
        const orderStatus = data['order_status'];
        if (!orderId) {
            return res.redirect('http://localhost:3000/?status=failed');
        }
        try {
            let booking = await this.bookingService['bookingRepository'].findOne({ where: { id: orderId } });
            let isBus = false;
            if (!booking) {
                booking = await this.busesService['bookingRepo'].findOne({
                    where: { id: orderId },
                    relations: ['schedule']
                });
                isBus = true;
            }
            if (booking) {
                if (orderStatus === 'Success') {
                    booking.status = 'CONFIRMED';
                    if (isBus) {
                        await this.busesService['bookingRepo'].save(booking);
                        if (booking.schedule) {
                            booking.schedule.seatsBooked += booking.selectedSeats.length;
                            await this.busesService['scheduleRepo'].save(booking.schedule);
                        }
                    }
                    else {
                        await this.bookingService['bookingRepository'].save(booking);
                    }
                    return res.redirect(`http://localhost:3000/?status=success&bookingId=${orderId}`);
                }
                else {
                    booking.status = 'CANCELLED';
                    if (isBus) {
                        await this.busesService['bookingRepo'].save(booking);
                    }
                    else {
                        await this.bookingService['bookingRepository'].save(booking);
                    }
                    return res.redirect(`http://localhost:3000/?status=failed&bookingId=${orderId}`);
                }
            }
        }
        catch (err) {
            console.error('Webhook error:', err);
        }
        return res.redirect('http://localhost:3000/?status=failed');
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Post)('initiate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "initiatePayment", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "handleWebhook", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('public/payment'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService,
        booking_service_1.BookingService,
        buses_service_1.BusesService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map