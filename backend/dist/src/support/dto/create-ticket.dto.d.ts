import { TicketPriority } from '../entities/support-ticket.entity';
export declare class CreateTicketDto {
    category: string;
    priority: TicketPriority;
    subject: string;
    description: string;
}
