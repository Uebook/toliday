import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Bus } from './bus.entity';
import { BusRoute } from './bus-route.entity';
import { Crew } from './crew.entity';
import { BusBooking } from './bus-booking.entity';

export enum ScheduleStatus {
  SCHEDULED = 'SCHEDULED',
  IN_TRANSIT = 'IN_TRANSIT',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Entity('bus_schedules')
export class BusSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  departureDate: string;

  @Column({ type: 'time' })
  departureTime: string;

  @Column({ type: 'time' })
  arrivalTime: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  baseFare: number;

  @Column({ nullable: true })
  busId: string;

  @ManyToOne(() => Bus, (bus) => bus.schedules, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'busId' })
  bus: Bus;

  @Column({ nullable: true })
  routeId: string;

  @ManyToOne(() => BusRoute, (route) => route.schedules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'routeId' })
  route: BusRoute;

  @Column({ nullable: true })
  driverId: string;

  @ManyToOne(() => Crew, (crew) => crew.drivenSchedules, { nullable: true })
  @JoinColumn({ name: 'driverId' })
  driver: Crew;

  @Column({ nullable: true })
  conductorId: string;

  @ManyToOne(() => Crew, (crew) => crew.conductedSchedules, { nullable: true })
  @JoinColumn({ name: 'conductorId' })
  conductor: Crew;

  @Column({
    type: 'enum',
    enum: ScheduleStatus,
    default: ScheduleStatus.SCHEDULED,
  })
  status: ScheduleStatus;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  weekendSurge: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  lastMinuteDiscount: number;

  @OneToMany(() => BusBooking, (booking) => booking.schedule)
  bookings: BusBooking[];

  @Column({ type: 'int', default: 0 })
  seatsBooked: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
