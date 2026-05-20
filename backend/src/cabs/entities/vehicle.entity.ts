import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CabVendor } from './cab-vendor.entity';

export enum VehicleCategory {
    HATCHBACK = 'HATCHBACK',
    SEDAN = 'SEDAN',
    SUV = 'SUV',
    PREMIUM_SUV = 'PREMIUM_SUV',
    LUXURY = 'LUXURY',
    TEMPO_TRAVELLER = 'TEMPO_TRAVELLER'
}

@Entity('cab_vehicles')
export class Vehicle {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    registrationNumber: string;

    @Column()
    make: string; // e.g., Maruti Suzuki

    @Column()
    model: string; // e.g., Dzire

    @Column({ type: 'int', nullable: true })
    year: number;

    @Column({
        type: 'enum',
        enum: VehicleCategory,
        default: VehicleCategory.SEDAN
    })
    category: VehicleCategory;

    @Column({ type: 'int', default: 4 })
    seatingCapacity: number;

    @Column({ default: true })
    hasAC: boolean;

    @Column({ nullable: true })
    rcDocumentUrl: string;

    @Column({ nullable: true })
    insuranceDocumentUrl: string;

    @Column({ nullable: true })
    permitDocumentUrl: string;

    @Column({ default: 'PENDING' })
    verificationStatus: string; // PENDING, APPROVED, REJECTED

    @Column({ default: true })
    isActive: boolean;

    @Column()
    vendorId: string;

    @ManyToOne(() => CabVendor, (vendor) => vendor.vehicles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'vendorId' })
    vendor: CabVendor;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
