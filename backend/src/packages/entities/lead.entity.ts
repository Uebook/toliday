import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TourPartner } from './tour-partner.entity';
import { TourPackage } from './tour-package.entity';

export enum LeadStatus {
    NEW = 'NEW',
    HOT = 'HOT',
    WARM = 'WARM',
    COLD = 'COLD',
    CONVERTED = 'CONVERTED',
    LOST = 'LOST'
}

@Entity('package_leads')
export class Lead {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    guestName: string;

    @Column()
    guestEmail: string;

    @Column({ nullable: true })
    guestPhone: string;

    @Column({ type: 'int', default: 2 })
    paxCount: number;

    @Column({ type: 'date', nullable: true })
    preferredDate: string;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @Column({
        type: 'enum',
        enum: LeadStatus,
        default: LeadStatus.NEW
    })
    status: LeadStatus;

    @Column({ nullable: true })
    packageId: string;

    @ManyToOne(() => TourPackage, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'packageId' })
    package: TourPackage;

    @Column()
    partnerId: string;

    @ManyToOne(() => TourPartner, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'partnerId' })
    partner: TourPartner;

    @Column({ type: 'date', nullable: true })
    nextFollowUp: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
