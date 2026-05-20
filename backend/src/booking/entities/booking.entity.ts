import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Hotel } from '../../hotel/entities/hotel.entity';
import { RoomType } from '../../room-type/entities/room-type.entity';

export enum BookingStatus {
       PENDING = 'PENDING',
       CONFIRMED = 'CONFIRMED',
       CANCELLED = 'CANCELLED',
       CHECKED_IN = 'CHECKED_IN',
       CHECKED_OUT = 'CHECKED_OUT',
       COMPLETED = 'COMPLETED',
}

@Entity('bookings')
export class Booking {
       @PrimaryGeneratedColumn('uuid')
       id: string;

       @Column()
       guestName: string;

       @Column()
       guestEmail: string;

       @Column({ nullable: true })
       guestContact: string;

       @Column({ type: 'date' })
       startDate: string;

       @Column({ type: 'date' })
       endDate: string;

       @Column('int')
       numberOfGuests: number;

       @Column('decimal', { precision: 10, scale: 2 })
       totalAmount: number;

       @Column({ unique: true, nullable: true })
       bookingReference: string;

       @Column({
              type: 'enum',
              enum: BookingStatus,
              default: BookingStatus.PENDING,
       })
       status: BookingStatus;

       @Column({ nullable: true })
       hotelId: string;

       @ManyToOne(() => Hotel, (hotel) => hotel.bookings, { onDelete: 'CASCADE', nullable: true })
       @JoinColumn({ name: 'hotelId' })
       hotel: Hotel;

       @Column({ nullable: true })
       roomTypeId: string;

       @ManyToOne(() => RoomType, (roomType) => roomType.bookings, { onDelete: 'CASCADE', nullable: true })
       @JoinColumn({ name: 'roomTypeId' })
       roomType: RoomType;

       @Column({ nullable: true })
       tourPartnerId: string;

       @Column({ nullable: true })
       packageId: string;

       @Column({ nullable: true })
       packageName: string;

       @Column({ default: false })
       isSettled: boolean;

       @Column('decimal', { precision: 10, scale: 2, default: 0 })
       commissionAmount: number;

       @Column('decimal', { precision: 10, scale: 2, default: 0 })
       netAmount: number;

       @CreateDateColumn()
       createdAt: Date;

       @UpdateDateColumn()
       updatedAt: Date;
}
