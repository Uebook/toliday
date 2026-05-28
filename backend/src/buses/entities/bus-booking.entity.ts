import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BusSchedule } from './bus-schedule.entity';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
}

@Entity('bus_bookings')
export class BusBooking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  pnr: string;

  @Column({ nullable: true })
  scheduleId: string;

  @ManyToOne(() => BusSchedule, (schedule) => schedule.bookings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'scheduleId' })
  schedule: BusSchedule;

  @Column({ type: 'jsonb' })
  passengerDetails: any[]; // [{ name: string, age: number, gender: string, seatName: string }]

  @Column({ type: 'simple-array' })
  selectedSeats: string[]; // ['L1', 'L2']

  @Column({ nullable: true })
  boardingPoint: string;

  @Column({ nullable: true })
  boardingTime: string;

  @Column({ nullable: true })
  droppingPoint: string;

  @Column({ nullable: true })
  droppingTime: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalFare: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @Column({ nullable: true })
  paymentId: string;

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
