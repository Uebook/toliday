import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CabVendor } from './cab-vendor.entity';

@Entity('cab_drivers')
export class Driver {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phone: string;

    @Column({ nullable: true })
    licenseNumber: string;

    @Column({ type: 'date', nullable: true })
    licenseExpiry: string;

    @Column({ nullable: true })
    licenseDocumentUrl: string;

    @Column({ nullable: true })
    aadharDocumentUrl: string;

    @Column({ nullable: true })
    policeVerificationUrl: string;

    @Column({ default: 'PENDING' })
    verificationStatus: string; // PENDING, APPROVED, REJECTED

    @Column({ default: true })
    isActive: boolean;

    @Column()
    vendorId: string;

    @ManyToOne(() => CabVendor, (vendor) => vendor.drivers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'vendorId' })
    vendor: CabVendor;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
