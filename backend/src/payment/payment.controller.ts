import { Controller, Post, Body, Res, Param, NotFoundException } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { BookingService } from '../booking/booking.service';
import { BusesService } from '../buses/buses.service';
import type { Response } from 'express';
import { BookingStatus } from '../booking/entities/booking.entity';

@Controller('public/payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly bookingService: BookingService,
    private readonly busesService: BusesService,
  ) {}

  @Post('initiate')
  async initiatePayment(@Body() body: { bookingId: string; hotelId?: string; bookingType?: 'HOTEL' | 'BUS' }) {
    let amount = '';
    let guestName = '';
    let guestEmail = '';
    let guestContact = '';

    if (body.bookingType === 'BUS') {
      const busBooking = await this.busesService['bookingRepo'].findOne({ where: { id: body.bookingId } });
      if (!busBooking) throw new NotFoundException('Bus booking not found');
      amount = busBooking.totalFare.toString();
      guestName = busBooking.passengerDetails?.[0]?.name || 'Bus Guest';
      guestEmail = 'guest@example.com'; // Bus booking doesn't currently store email directly, use mock or first passenger
      guestContact = '';
    } else {
      const booking = await this.bookingService.findOne(body.bookingId, body.hotelId || '');
      if (!booking) throw new NotFoundException('Hotel booking not found');
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

  @Post('webhook')
  async handleWebhook(@Body() body: { encResp: string }, @Res() res: Response) {
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

    // We assume hotelId is not needed for admin-level webhook updates, but our updateStatus method requires hotelId.
    // However, bookingService provides updateStatus which checks hotelId. We can bypass it or query first.
    // For webhook, we should fetch booking directly.
    try {
      // Check Hotel Booking
      let booking: any = await this.bookingService['bookingRepository'].findOne({ where: { id: orderId } });
      let isBus = false;

      if (!booking) {
        // Check Bus Booking
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
             // Increment seats booked
             if (booking.schedule) {
                booking.schedule.seatsBooked += booking.selectedSeats.length;
                await this.busesService['scheduleRepo'].save(booking.schedule);
             }
          } else {
             await this.bookingService['bookingRepository'].save(booking);
          }
          
          return res.redirect(`http://localhost:3000/?status=success&bookingId=${orderId}`);
        } else {
          booking.status = 'CANCELLED';
          if (isBus) {
             await this.busesService['bookingRepo'].save(booking);
          } else {
             await this.bookingService['bookingRepository'].save(booking);
          }
          
          return res.redirect(`http://localhost:3000/?status=failed&bookingId=${orderId}`);
        }
      }
    } catch (err) {
      console.error('Webhook error:', err);
    }
    
    return res.redirect('http://localhost:3000/?status=failed');
  }
}
