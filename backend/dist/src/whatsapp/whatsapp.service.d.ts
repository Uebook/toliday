export declare class WhatsappService {
    private readonly logger;
    private readonly apiUrl;
    constructor();
    private sendTemplateMessage;
    sendPartnerSignupWelcome(to: string, partnerName: string, businessName: string): Promise<void>;
    sendAccountUnderReview(to: string, partnerName: string, businessName: string): Promise<void>;
    sendAccountApproved(to: string, partnerName: string, businessName: string): Promise<void>;
    sendAccountRejected(to: string, partnerName: string, businessName: string, rejectionReason: string): Promise<void>;
    sendNewBookingAlertPartner(to: string, partnerName: string, propertyName: string, bookingId: string, checkInDate: string, checkOutDate: string, guestCount: string, amount: string): Promise<void>;
    sendBookingCancellationAlertPartner(to: string, partnerName: string, propertyName: string, bookingId: string, checkInDate: string, checkOutDate: string): Promise<void>;
    sendBookingConfirmationGuest(to: string, guestName: string, bookingId: string, propertyName: string, checkInDate: string, checkOutDate: string, guestCount: string, amount: string): Promise<void>;
    sendPaymentConfirmationGuest(to: string, guestName: string, bookingId: string, amount: string, transactionId: string): Promise<void>;
    sendBookingCancellationGuest(to: string, guestName: string, propertyName: string, bookingId: string): Promise<void>;
    sendCheckinReminder(to: string, guestName: string, propertyName: string, bookingId: string, checkInDate: string): Promise<void>;
    sendCheckoutReminder(to: string, guestName: string, propertyName: string, bookingId: string): Promise<void>;
}
