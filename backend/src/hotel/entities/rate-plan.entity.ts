import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RoomType } from '../../room-type/entities/room-type.entity';

export enum MealPlan {
  EP = 'EP', // European Plan (Room Only)
  CP = 'CP', // Continental Plan (Breakfast)
  MAP = 'MAP', // Modified American Plan (Breakfast + Lunch/Dinner)
  AP = 'AP', // American Plan (All Meals)
}

@Entity('rate_plans')
export class RatePlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // e.g., "Standard CP", "Non-Refundable MAP"

  @Column({
    type: 'enum',
    enum: MealPlan,
    default: MealPlan.EP,
  })
  mealPlan: MealPlan;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  markupAmount: number; // Fixed markup over base room price

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  markupPercentage: number; // Percentage markup over base room price

  @Column({ default: true })
  isRefundable: boolean;

  @Column({ type: 'text', nullable: true })
  cancellationPolicy: string;

  @Column({ type: 'jsonb', nullable: true })
  inclusions: string[]; // e.g., ["Free WiFi", "Welcome Drink"]

  @Column()
  roomTypeId: string;

  @ManyToOne(() => RoomType, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roomTypeId' })
  roomType: RoomType;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
