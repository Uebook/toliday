import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { VerticalType } from './ledger-entry.entity';

@Entity('finance_invoices')
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  vendorId: string;

  @Column({
    type: 'enum',
    enum: VerticalType,
  })
  vertical: VerticalType;

  @Column({ unique: true })
  invoiceNumber: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  totalAmount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  commissionAmount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  gstAmount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  tdsAmount: number;

  @Column({ nullable: true })
  fileUrl: string;

  @Column({ type: 'date', nullable: true })
  invoiceDate: string;

  @Column({ default: 'UNPAID' })
  status: string; // PAID, UNPAID, CANCELLED

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
