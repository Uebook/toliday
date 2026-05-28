import { SupportService } from './support.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
export declare class SupportController {
    private readonly supportService;
    constructor(supportService: SupportService);
    getFaqs(): Promise<import("./entities/support-faq.entity").SupportFaq[]>;
    createTicket(req: any, dto: CreateTicketDto): Promise<import("./entities/support-ticket.entity").SupportTicket>;
    getMyTickets(req: any): Promise<import("./entities/support-ticket.entity").SupportTicket[]>;
    seed(): Promise<{
        message: string;
    }>;
}
