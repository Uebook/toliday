import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportFaq } from './entities/support-faq.entity';
import { SupportTicket } from './entities/support-ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(SupportFaq)
    private faqRepository: Repository<SupportFaq>,
    @InjectRepository(SupportTicket)
    private ticketRepository: Repository<SupportTicket>,
  ) {}

  async findAllFaqs(): Promise<SupportFaq[]> {
    return this.faqRepository.find({ order: { displayOrder: 'ASC' } });
  }

  async createTicket(
    partnerId: string,
    type: 'hotel' | 'tour',
    dto: CreateTicketDto,
  ): Promise<SupportTicket> {
    const ticketData: any = { ...dto };
    if (type === 'hotel') ticketData.hotelId = partnerId;
    else ticketData.tourPartnerId = partnerId;

    const ticket = new SupportTicket();
    Object.assign(ticket, ticketData);
    return await this.ticketRepository.save(ticket);
  }

  async findAllByPartner(
    partnerId: string,
    type: 'hotel' | 'tour',
  ): Promise<SupportTicket[]> {
    const where: any =
      type === 'hotel' ? { hotelId: partnerId } : { tourPartnerId: partnerId };
    return this.ticketRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async findAllTickets(): Promise<SupportTicket[]> {
    return this.ticketRepository.find({
      relations: ['hotel', 'tourPartner'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateTicket(id: string, dto: any): Promise<SupportTicket> {
    await this.ticketRepository.update(id, dto);
    const updated = await this.ticketRepository.findOne({
      where: { id },
      relations: ['hotel', 'tourPartner'],
    });
    if (!updated) throw new NotFoundException('Ticket not found');
    return updated;
  }

  // Helper method to seed initial FAQs if empty
  async seedInitialFaqs() {
    const count = await this.faqRepository.count();
    if (count === 0) {
      const initialFaqs = [
        {
          q: 'How do I update my room availability?',
          a: 'Go to Inventory Console → Select your room type → Click on any date to update availability or enable Stop Sale.',
          cat: 'Inventory',
        },
        {
          q: 'Can I set different rates for the same room on different dates?',
          a: 'Yes! Use Rate Manager to create seasonal and special event rate rules. These override the base rate for the specified date range.',
          cat: 'Rates',
        },
        {
          q: 'How does the inventory hold work?',
          a: 'When a customer starts the checkout process, the room is held for 15 minutes. If payment is not completed, the hold is released automatically.',
          cat: 'Bookings',
        },
        {
          q: 'How do I add a staff member?',
          a: 'Go to Staff Management → Click "Add Staff Member" → Fill in their details and set permissions. They will receive a welcome email with login instructions.',
          cat: 'Staff',
        },
        {
          q: 'When will I receive my payouts?',
          a: 'Payouts are processed every 7 days. TolidayTrip deducts the agreed commission and transfers the balance to your registered bank account.',
          cat: 'Payments',
        },
        {
          q: 'How do I upload hotel images?',
          a: 'Go to Media Gallery and either drag & drop images or click "Browse Files". Organize them by category (Lobby, Rooms, etc.) for the best guest experience.',
          cat: 'Media',
        },
      ];

      for (const faq of initialFaqs) {
        await this.faqRepository.save(
          this.faqRepository.create({
            question: faq.q,
            answer: faq.a,
            category: faq.cat,
            displayOrder: initialFaqs.indexOf(faq),
          }),
        );
      }
    }
  }
}
