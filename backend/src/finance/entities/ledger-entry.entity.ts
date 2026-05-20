import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum VerticalType {
    HOTEL = 'HOTEL',
    PACKAGE = 'PACKAGE',
    BUS = 'BUS',
    CAB = 'CAB'
}

export enum LedgerEntryType {
    CREDIT = 'CREDIT', // e.g. Booking Revenue
    DEBIT = 'DEBIT'    // e.g. Commission deduction, Payout settlement
}

@Entity('finance_ledger_entries')
export class LedgerEntry {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    vendorId: string; // Generic ID reference to Hotel/Partner/Bus/Cab vendor

    @Column({
        type: 'enum',
        enum: VerticalType
    })
    vertical: VerticalType;

    @Column({
        type: 'enum',
        enum: LedgerEntryType
    })
    type: LedgerEntryType;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    amount: number;

    @Column()
    description: string; // e.g. "Booking Revenue #BK123"

    @Column({ nullable: true })
    referenceId: string; // Could be Booking ID or PayoutRequest ID

    @Column({ default: 'COMPLETED' })
    status: string; // PENDING, COMPLETED, FAILED

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
