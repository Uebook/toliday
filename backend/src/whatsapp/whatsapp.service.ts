import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);
  private readonly apiUrl = 'https://multichannel.insignsms.com/api/v1/whatsapp';

  constructor() {}

  private async sendTemplateMessage(to: string, templateName: string, headerParams: string[] = [], bodyParams: string[] = []) {
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const apiKey = process.env.Whatsapp_key;

    if (!phoneNumberId || !apiKey) {
      this.logger.warn('WhatsApp API credentials are not configured. Message not sent.');
      return;
    }

    // Ensure phone number contains only digits
    let cleanTo = to.replace(/\D/g, '');
    // If it's a 10 digit Indian number without country code, prefix it
    if (cleanTo.length === 10) {
      cleanTo = '91' + cleanTo;
    }

    const components: any[] = [];
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
      to: cleanTo,
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
      } else {
        const responseData = await response.json();
        this.logger.log(`WhatsApp message sent successfully to ${to}. Message ID: ${responseData.messages?.[0]?.id}`);
      }
    } catch (error) {
      this.logger.error(`Error sending WhatsApp message: ${error.message}`);
    }
  }

  // 1. Partner Signup - Welcome Message
  async sendPartnerSignupWelcome(to: string, partnerName: string, businessName: string) {
    await this.sendTemplateMessage(to, 'partnersignup_welcomemessage', [partnerName], [businessName]);
  }

  // 2. Account Under Review
  async sendAccountUnderReview(to: string, partnerName: string, businessName: string) {
    await this.sendTemplateMessage(to, 'account_under_review', [partnerName], [businessName]);
  }

  // 3. Account Approved
  async sendAccountApproved(to: string, partnerName: string, businessName: string) {
    await this.sendTemplateMessage(to, 'account_approved_confirmation', [partnerName], [businessName]);
  }

  // 4. Account Rejected
  async sendAccountRejected(to: string, partnerName: string, businessName: string, rejectionReason: string) {
    await this.sendTemplateMessage(to, 'account_rejected', [partnerName], [businessName, rejectionReason]);
  }

  // 5. New Booking Alert (Partner)
  async sendNewBookingAlertPartner(to: string, partnerName: string, propertyName: string, bookingId: string, checkInDate: string, checkOutDate: string, guestCount: string, amount: string) {
    await this.sendTemplateMessage(to, 'new_booking_alert_partner', [partnerName], [propertyName, bookingId, checkInDate, checkOutDate, guestCount, amount]);
  }

  // 6. Booking Cancellation Alert (Partner)
  async sendBookingCancellationAlertPartner(to: string, partnerName: string, propertyName: string, bookingId: string, checkInDate: string, checkOutDate: string) {
    await this.sendTemplateMessage(to, 'booking_cancellation_alert_partner', [partnerName], [propertyName, bookingId, checkInDate, checkOutDate]);
  }

  // 7. Booking Confirmation (Guest)
  async sendBookingConfirmationGuest(to: string, guestName: string, bookingId: string, propertyName: string, checkInDate: string, checkOutDate: string, guestCount: string, amount: string) {
    await this.sendTemplateMessage(to, 'guest_notifications_booking_confirmation', [guestName], [bookingId, propertyName, checkInDate, checkOutDate, guestCount, amount]);
  }

  // 8. Payment Confirmation (Guest)
  async sendPaymentConfirmationGuest(to: string, guestName: string, bookingId: string, amount: string, transactionId: string) {
    await this.sendTemplateMessage(to, 'payment_confirmation', [guestName], [bookingId, amount, transactionId]);
  }

  // 9. Booking Cancellation (Guest)
  async sendBookingCancellationGuest(to: string, guestName: string, propertyName: string, bookingId: string) {
    await this.sendTemplateMessage(to, 'booking_cancellation_guest', [guestName], [propertyName, bookingId]);
  }

  // 10. Check-in Reminder
  async sendCheckinReminder(to: string, guestName: string, propertyName: string, bookingId: string, checkInDate: string) {
    await this.sendTemplateMessage(to, 'checkin_reminder', [guestName], [propertyName, bookingId, checkInDate]);
  }

  // 11. Check-out Reminder
  async sendCheckoutReminder(to: string, guestName: string, propertyName: string, bookingId: string) {
    await this.sendTemplateMessage(to, 'checkout_reminder', [guestName], [propertyName, bookingId]);
  }
}
