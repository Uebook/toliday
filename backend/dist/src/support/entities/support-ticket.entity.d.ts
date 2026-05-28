import { Hotel } from '../../hotel/entities/hotel.entity';
import { TourPartner } from '../../packages/entities/tour-partner.entity';
export declare enum TicketStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    RESOLVED = "RESOLVED",
    CLOSED = "CLOSED"
}
export declare enum TicketPriority {
    NORMAL = "NORMAL",
    HIGH = "HIGH",
    URGENT = "URGENT"
}
export declare class SupportTicket {
    id: string;
    category: string;
    priority: TicketPriority;
    subject: string;
    description: string;
    status: TicketStatus;
    adminComment: string;
    hotelId: string;
    hotel: Hotel;
    tourPartnerId: string;
    tourPartner: TourPartner;
    createdAt: Date;
    updatedAt: Date;
}
