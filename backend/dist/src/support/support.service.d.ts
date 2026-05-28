import { Repository } from 'typeorm';
import { SupportFaq } from './entities/support-faq.entity';
import { SupportTicket } from './entities/support-ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
export declare class SupportService {
    private faqRepository;
    private ticketRepository;
    constructor(faqRepository: Repository<SupportFaq>, ticketRepository: Repository<SupportTicket>);
    findAllFaqs(): Promise<SupportFaq[]>;
    createTicket(partnerId: string, type: 'hotel' | 'tour', dto: CreateTicketDto): Promise<SupportTicket>;
    findAllByPartner(partnerId: string, type: 'hotel' | 'tour'): Promise<SupportTicket[]>;
    findAllTickets(): Promise<SupportTicket[]>;
    updateTicket(id: string, dto: any): Promise<SupportTicket>;
    seedInitialFaqs(): Promise<void>;
}
