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
import { TourPartner } from '../../packages/entities/tour-partner.entity';
import { BusVendor } from '../../buses/entities/bus-vendor.entity';
import { CabVendor } from '../../cabs/entities/cab-vendor.entity';

export enum StaffRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  RECEPTIONIST = 'RECEPTIONIST',
}

@Entity('staffs')
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  phone: string;

  @Column({
    type: 'enum',
    enum: StaffRole,
    default: StaffRole.RECEPTIONIST,
  })
  role: StaffRole;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  lastLogin: Date;

  @Column({ type: 'jsonb', nullable: true, default: {} })
  permissions: Record<string, boolean>;

  @Column({ default: false })
  twoFactorEnabled: boolean;

  @Column({ default: true })
  emailNotifications: boolean;

  @Column({ default: true })
  smsNotifications: boolean;

  @Column({ nullable: true })
  hotelId: string;

  @ManyToOne(() => Hotel, (hotel) => hotel.staffs, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'hotelId' })
  hotel: Hotel;

  @Column({ nullable: true })
  tourPartnerId: string;

  @ManyToOne(() => TourPartner, (partner) => partner.staffs, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'tourPartnerId' })
  tourPartner: TourPartner;

  @Column({ nullable: true })
  busVendorId: string;

  @ManyToOne(() => BusVendor, (vendor) => vendor.staffs, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'busVendorId' })
  busVendor: BusVendor;

  @Column({ nullable: true })
  cabVendorId: string;

  @ManyToOne(() => CabVendor, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'cabVendorId' })
  cabVendor: CabVendor;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
