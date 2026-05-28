import { PaymentService } from './payment.service';
import { BookingService } from '../booking/booking.service';
import { BusesService } from '../buses/buses.service';
import type { Response } from 'express';
export declare class PaymentController {
    private readonly paymentService;
    private readonly bookingService;
    private readonly busesService;
    constructor(paymentService: PaymentService, bookingService: BookingService, busesService: BusesService);
    initiatePayment(body: {
        bookingId: string;
        hotelId?: string;
        bookingType?: 'HOTEL' | 'BUS';
    }): Promise<{
        encRequest: string;
        access_code: string;
        url: string;
    }>;
    handleWebhook(body: {
        encResp: string;
    }, res: Response): Promise<void>;
}
