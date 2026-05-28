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
import { BusVendor } from './bus-vendor.entity';
import { BusSchedule } from './bus-schedule.entity';

export enum CrewRole {
  DRIVER = 'DRIVER',
  CONDUCTOR = 'CONDUCTOR',
}

@Entity('bus_crew')
export class Crew {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CrewRole,
    default: CrewRole.DRIVER,
  })
  role: CrewRole;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  licenseNumber: string;

  @Column({ type: 'date', nullable: true })
  licenseExpiry: string;

  @Column({ nullable: true })
  aadharNumber: string;

  @Column({ nullable: true })
  vendorId: string;

  @ManyToOne(() => BusVendor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vendorId' })
  vendor: BusVendor;

  @OneToMany(() => BusSchedule, (schedule) => schedule.driver)
  drivenSchedules: BusSchedule[];

  @OneToMany(() => BusSchedule, (schedule) => schedule.conductor)
  conductedSchedules: BusSchedule[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
