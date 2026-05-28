import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { BusSchedule } from './bus-schedule.entity';

@Entity('bus_routes')
export class BusRoute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originCity: string;

  @Column()
  destinationCity: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  distanceKm: number;

  @Column({ nullable: true })
  estimatedDuration: string;

  @Column({ type: 'jsonb', nullable: true })
  boardingPoints: any[]; // e.g. [{ time: '18:00', location: 'City Center' }]

  @Column({ type: 'jsonb', nullable: true })
  droppingPoints: any[]; // e.g. [{ time: '06:00', location: 'Bus Stand' }]

  @OneToMany(() => BusSchedule, (schedule) => schedule.route)
  schedules: BusSchedule[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
