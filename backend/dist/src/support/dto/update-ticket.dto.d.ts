import { TicketStatus } from '../entities/support-ticket.entity';
export declare class UpdateTicketDto {
    status?: TicketStatus;
    adminComment?: string;
}
