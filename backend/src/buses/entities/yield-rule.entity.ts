import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Bus } from './bus.entity';

@Entity('bus_yield_rules')
export class YieldRule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // e.g., "High Demand Surge", "Last Seat Premium"

  @Column({ type: 'int', default: 80 })
  occupancyThreshold: number; // Percentage, e.g., if occupancy > 80%

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  surgePercentage: number; // e.g., 15.00 (+15% to base price)

  @Column({ default: true })
  isActive: boolean;

  @Column()
  busId: string;

  @ManyToOne(() => Bus, (bus) => bus.yieldRules, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'busId' })
  bus: Bus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
