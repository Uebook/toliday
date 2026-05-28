import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Hotel } from '../../hotel/entities/hotel.entity';

@Entity('rates')
export class Rate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  hotelId: string;

  @ManyToOne(() => Hotel, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'hotelId' })
  hotel: Hotel;

  @Column({ nullable: true })
  tourPartnerId: string;

  @Column({ nullable: true })
  packageId: string;

  // 'all' or a specific room type ID / category
  @Column({ nullable: true })
  roomTypeId: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  rate: number; // Base rate or Adult rate

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  childPrice: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  infantPrice: number;

  @Column({ default: 'seasonal' })
  type: string; // seasonal | special | holiday

  @Column()
  startDate: string; // YYYY-MM-DD

  @Column()
  endDate: string;

  @Column({ nullable: true })
  minNights: number;

  @Column({ nullable: true })
  roomTypeName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
