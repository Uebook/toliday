import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Staff } from '../../staff/entities/staff.entity';
import { RoomType } from '../../room-type/entities/room-type.entity';
import { Booking } from '../../booking/entities/booking.entity';
import { Review } from './review.entity';

export enum HotelStatus {
       PENDING = 'PENDING',
       APPROVED = 'APPROVED',
       REJECTED = 'REJECTED',
       BLOCKED = 'BLOCKED'
}

@Entity('hotels')
export class Hotel {
       @PrimaryGeneratedColumn('uuid')
       id: string;

       @Column()
       name: string;

       @Column({ nullable: true })
       description: string;

       @Column({ nullable: true })
       address: string;

       @Column({ nullable: true })
       city: string;

       @Column({ nullable: true })
       pinCode: string;

       @Column({ nullable: true, type: 'decimal', precision: 10, scale: 7 })
       latitude: number;

       @Column({ nullable: true, type: 'decimal', precision: 10, scale: 7 })
       longitude: number;

       @Column({ nullable: true })
       contactNumber: string;

       @Column({ nullable: true })
       website: string;

       @Column({ unique: true })
       email: string;

       @Column({ nullable: true, default: 3 })
       stars: number;

       @Column({ nullable: true, default: '14:00' })
       checkInTime: string;

       @Column({ nullable: true, default: '11:00' })
       checkOutTime: string;

       @Column({ nullable: true, default: '4' })
       maxAdults: string;

       @Column({ nullable: true, default: '2' })
       maxChildren: string;

       @Column({ nullable: true, type: 'text' })
       childPolicy: string;

       @Column({ nullable: true, type: 'text' })
       cancellationPolicy: string;

       @Column({ nullable: true, type: 'text' })
       petPolicy: string;

       @Column({ type: 'simple-array', nullable: true })
       amenities: string[];

       @Column({ type: 'simple-array', nullable: true })
       images: string[];

       // Owner / profile info
       @Column({ nullable: true })
       ownerFirstName: string;

       @Column({ nullable: true })
       ownerLastName: string;

       @Column({ nullable: true })
       ownerPhone: string;

       @Column({ nullable: true })
       businessName: string;

       @Column({ nullable: true })
       businessType: string;

       @Column({ nullable: true })
       gstNumber: string;

       @Column({ nullable: true })
       panNumber: string;

       @Column({ nullable: true })
       gstDoc: string;

       @Column({ nullable: true })
       panDoc: string;

       @Column({ nullable: true })
       licenseDoc: string;

       // Bank details
       @Column({ nullable: true })
       bankHolder: string;

       @Column({ nullable: true })
       bankName: string;

       @Column({ nullable: true })
       bankAccount: string;

       @Column({ nullable: true })
       bankIfsc: string;

       @Column({ default: false })
       isVerified: boolean;

       @Column({
              type: 'enum',
              enum: HotelStatus,
              default: HotelStatus.PENDING
       })
       status: HotelStatus;

       @OneToMany(() => Staff, (staff) => staff.hotel)
       staffs: Staff[];

       @OneToMany(() => RoomType, (roomType) => roomType.hotel)
       roomTypes: RoomType[];

       @OneToMany(() => Booking, (booking) => booking.hotel)
       bookings: Booking[];

       @OneToMany(() => Review, (review) => review.hotel)
       reviews: Review[];


       @CreateDateColumn()
       createdAt: Date;

       @UpdateDateColumn()
       updatedAt: Date;
}
