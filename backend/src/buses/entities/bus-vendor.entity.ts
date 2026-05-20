import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Staff } from '../../staff/entities/staff.entity';
import { Bus } from './bus.entity';

export enum BusVendorStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    BLOCKED = 'BLOCKED'
}

@Entity('bus_vendors')
export class BusVendor {
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

    @Column({ nullable: true })
    contactNumber: string;

    @Column({ nullable: true })
    website: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true, type: 'text' })
    cancellationPolicy: string;

    @Column({ nullable: true, type: 'text' })
    luggagePolicy: string;

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

    @Column({ nullable: true })
    apiKey: string;

    @Column({ nullable: true })
    webhookUrl: string;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
    commissionPercentage: number;

    @Column({ default: false })
    gstInvoicingEnabled: boolean;

    @Column({
        type: 'enum',
        enum: BusVendorStatus,
        default: BusVendorStatus.PENDING
    })
    status: BusVendorStatus;

    @OneToMany(() => Staff, (staff) => staff.busVendor)
    staffs: Staff[];

    @OneToMany(() => Bus, (bus) => bus.vendor)
    buses: Bus[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
