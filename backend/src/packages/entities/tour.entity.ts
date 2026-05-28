import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TourPartner } from './tour-partner.entity';

export enum TourStatus {
  ACTIVE = 'ACTIVE',
  DRAFT = 'DRAFT',
  INACTIVE = 'INACTIVE',
}

@Entity('tours')
export class Tour {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  duration: string; // e.g., "4 hours", "Full day"

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  basePrice: number;

  @Column({ default: 0 })
  maxCapacity: number;

  @Column({ type: 'simple-array', nullable: true })
  includes: string[];

  @Column({ type: 'simple-array', nullable: true })
  excludes: string[];

  @Column({ type: 'jsonb', nullable: true })
  itinerary: any[];

  @Column({
    type: 'enum',
    enum: TourStatus,
    default: TourStatus.DRAFT,
  })
  status: TourStatus;

  @Column()
  partnerId: string;

  @ManyToOne(() => TourPartner, (partner) => partner.tours, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'partnerId' })
  partner: TourPartner;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
