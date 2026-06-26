import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Staff } from '../../staff/entities/staff.entity';
import { RoomType } from '../../room-type/entities/room-type.entity';

export enum HousekeepingStatus {
  CLEAN = 'CLEAN',
  DIRTY = 'DIRTY',
  MAINTENANCE = 'MAINTENANCE',
  OUT_OF_ORDER = 'OUT_OF_ORDER',
}

@Entity('housekeeping_records')
export class Housekeeping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hotelId: string;

  @Column()
  roomNumber: string;

  @Column()
  roomTypeId: string;

  @ManyToOne(() => RoomType, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roomTypeId' })
  roomType: RoomType;

  @Column({
    type: 'varchar',
    default: HousekeepingStatus.DIRTY,
  })
  status: HousekeepingStatus;

  @Column({ nullable: true })
  assignedStaffId: string;

  @ManyToOne(() => Staff, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'assignedStaffId' })
  assignedStaff: Staff;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
