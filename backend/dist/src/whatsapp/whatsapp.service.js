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
var WhatsappService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappService = void 0;
const common_1 = require("@nestjs/common");
let WhatsappService = WhatsappService_1 = class WhatsappService {
    logger = new common_1.Logger(WhatsappService_1.name);
    apiUrl = 'https://multichannel.insignsms.com/api/v1/whatsapp';
    constructor() { }
    async sendTemplateMessage(to, templateName, headerParams = [], bodyParams = []) {
        const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
        const apiKey = process.env.Whatsapp_key;
        if (!phoneNumberId || !apiKey) {
            this.logger.warn('WhatsApp API credentials are not configured. Message not sent.');
            return;
        }
        const components = [];
        if (headerParams.length > 0) {
            components.push({
                type: 'header',
                parameters: headerParams.map(p => ({ type: 'text', text: p }))
            });
        }
        if (bodyParams.length > 0) {
            components.push({
                type: 'body',
                parameters: bodyParams.map(p => ({ type: 'text', text: p }))
            });
        }
        const payload = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: to,
            type: 'template',
            template: {
                name: templateName,
                language: {
                    code: 'en_US'
                },
                components: components
            }
        };
        try {
            const response = await fetch(`${this.apiUrl}/${phoneNumberId}/messages`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const errorData = await response.text();
                this.logger.error(`Failed to send WhatsApp message: ${errorData}`);
            }
            else {
                const responseData = await response.json();
                this.logger.log(`WhatsApp message sent successfully to ${to}. Message ID: ${responseData.messages?.[0]?.id}`);
            }
        }
        catch (error) {
            this.logger.error(`Error sending WhatsApp message: ${error.message}`);
        }
    }
    async sendPartnerSignupWelcome(to, partnerName, businessName) {
        await this.sendTemplateMessage(to, 'partnersignup_welcomemessage', [partnerName], [businessName]);
    }
    async sendAccountUnderReview(to, partnerName, businessName) {
        await this.sendTemplateMessage(to, 'account_under_review', [partnerName], [businessName]);
    }
    async sendAccountApproved(to, partnerName, businessName) {
        await this.sendTemplateMessage(to, 'account_approved_confirmation', [partnerName], [businessName]);
    }
    async sendAccountRejected(to, partnerName, businessName, rejectionReason) {
        await this.sendTemplateMessage(to, 'account_rejected', [partnerName], [businessName, rejectionReason]);
    }
    async sendNewBookingAlertPartner(to, partnerName, propertyName, bookingId, checkInDate, checkOutDate, guestCount, amount) {
        await this.sendTemplateMessage(to, 'new_booking_alert_partner', [partnerName], [propertyName, bookingId, checkInDate, checkOutDate, guestCount, amount]);
    }
    async sendBookingCancellationAlertPartner(to, partnerName, propertyName, bookingId, checkInDate, checkOutDate) {
        await this.sendTemplateMessage(to, 'booking_cancellation_alert_partner', [partnerName], [propertyName, bookingId, checkInDate, checkOutDate]);
    }
    async sendBookingConfirmationGuest(to, guestName, bookingId, propertyName, checkInDate, checkOutDate, guestCount, amount) {
        await this.sendTemplateMessage(to, 'guest_notifications_booking_confirmation', [guestName], [bookingId, propertyName, checkInDate, checkOutDate, guestCount, amount]);
    }
    async sendPaymentConfirmationGuest(to, guestName, bookingId, amount, transactionId) {
        await this.sendTemplateMessage(to, 'payment_confirmation', [guestName], [bookingId, amount, transactionId]);
    }
    async sendBookingCancellationGuest(to, guestName, propertyName, bookingId) {
        await this.sendTemplateMessage(to, 'booking_cancellation_guest', [guestName], [propertyName, bookingId]);
    }
    async sendCheckinReminder(to, guestName, propertyName, bookingId, checkInDate) {
        await this.sendTemplateMessage(to, 'checkin_reminder', [guestName], [propertyName, bookingId, checkInDate]);
    }
    async sendCheckoutReminder(to, guestName, propertyName, bookingId) {
        await this.sendTemplateMessage(to, 'checkout_reminder', [guestName], [propertyName, bookingId]);
    }
};
exports.WhatsappService = WhatsappService;
exports.WhatsappService = WhatsappService = WhatsappService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], WhatsappService);
//# sourceMappingURL=whatsapp.service.js.map