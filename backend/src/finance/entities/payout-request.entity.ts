import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { VerticalType } from './ledger-entry.entity';

@Entity('finance_payout_requests')
export class PayoutRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  vendorId: string;

  @Column({
    type: 'enum',
    enum: VerticalType,
  })
  vertical: VerticalType;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ default: 'PENDING' })
  status: string; // PENDING, PROCESSING, PAID, REJECTED

  @Column({ nullable: true })
  bankReferenceNo: string;

  @Column({ nullable: true })
  adminRemarks: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
