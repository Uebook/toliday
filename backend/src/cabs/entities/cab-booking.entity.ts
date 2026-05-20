import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CabVendor } from './cab-vendor.entity';
import { Vehicle } from './vehicle.entity';
import { Driver } from './driver.entity';

export enum CabBookingStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    ONGOING = 'ONGOING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

@Entity('cab_bookings')
export class CabBooking {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    bookingId: string; // e.g. TOL-CAB-12345

    @Column()
    customerName: string;

    @Column()
    customerPhone: string;

    @Column()
    pickupLocation: string;

    @Column()
    dropLocation: string;

    @Column({ type: 'timestamp' })
    pickupDateTime: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalAmount: number;

    @Column({
        type: 'enum',
        enum: CabBookingStatus,
        default: CabBookingStatus.PENDING
    })
    status: CabBookingStatus;

    @Column({ nullable: true })
    vendorId: string;

    @ManyToOne(() => CabVendor, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'vendorId' })
    vendor: CabVendor;

    @Column({ nullable: true })
    vehicleId: string;

    @ManyToOne(() => Vehicle, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'vehicleId' })
    vehicle: Vehicle;

    @Column({ nullable: true })
    driverId: string;

    @ManyToOne(() => Driver, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'driverId' })
    driver: Driver;

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
