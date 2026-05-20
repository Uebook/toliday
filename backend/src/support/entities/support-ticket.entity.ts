import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Hotel } from '../../hotel/entities/hotel.entity';
import { TourPartner } from '../../packages/entities/tour-partner.entity';

export enum TicketStatus {
       OPEN = 'OPEN',
       IN_PROGRESS = 'IN_PROGRESS',
       RESOLVED = 'RESOLVED',
       CLOSED = 'CLOSED',
}

export enum TicketPriority {
       NORMAL = 'NORMAL',
       HIGH = 'HIGH',
       URGENT = 'URGENT',
}

@Entity('support_tickets')
export class SupportTicket {
       @PrimaryGeneratedColumn('uuid')
       id: string;

       @Column()
       category: string;

       @Column({
              type: 'enum',
              enum: TicketPriority,
              default: TicketPriority.NORMAL,
       })
       priority: TicketPriority;

       @Column()
       subject: string;

       @Column({ type: 'text' })
       description: string;

       @Column({
              type: 'enum',
              enum: TicketStatus,
              default: TicketStatus.OPEN,
       })
       status: TicketStatus;

       @Column({ type: 'text', nullable: true })
       adminComment: string;

       @Column({ nullable: true })
       hotelId: string;

       @ManyToOne(() => Hotel, { onDelete: 'CASCADE', nullable: true })
       @JoinColumn({ name: 'hotelId' })
       hotel: Hotel;

       @Column({ nullable: true })
       tourPartnerId: string;

       @ManyToOne(() => TourPartner, { onDelete: 'CASCADE', nullable: true })
       @JoinColumn({ name: 'tourPartnerId' })
       tourPartner: TourPartner;

       @CreateDateColumn()
       createdAt: Date;

       @UpdateDateColumn()
       updatedAt: Date;
}
