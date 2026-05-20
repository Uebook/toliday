import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Hotel } from './hotel.entity';

@Entity('hotel_reviews')
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    guestName: string;

    @Column({ type: 'int' })
    rating: number; // 1 to 5

    @Column({ type: 'text' })
    comment: string;

    @Column({ type: 'text', nullable: true })
    vendorReply: string;

    @Column({ nullable: true })
    vendorReplyAt: Date;

    @Column()
    hotelId: string;

    @ManyToOne(() => Hotel, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'hotelId' })
    hotel: Hotel;

    @Column({ default: true })
    isVisible: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
