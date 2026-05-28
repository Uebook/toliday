import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CabVendor } from './cab-vendor.entity';
import { VehicleCategory } from './vehicle.entity';

export enum PricingModel {
  OUTSTATION = 'OUTSTATION',
  LOCAL_RENTAL = 'LOCAL_RENTAL', // e.g., 8hr/80km
  AIRPORT_TRANSFER = 'AIRPORT_TRANSFER',
}

@Entity('cab_pricing')
export class CabPricing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: PricingModel,
    default: PricingModel.OUTSTATION,
  })
  model: PricingModel;

  @Column({
    type: 'enum',
    enum: VehicleCategory,
    default: VehicleCategory.SEDAN,
  })
  category: VehicleCategory;

  // Outstation specific
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  perKmRate: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  driverAllowancePerDay: number;

  @Column({ type: 'int', nullable: true })
  minKmPerDay: number;

  // Local Rental specific
  @Column({ nullable: true })
  packageHours: number; // e.g. 8

  @Column({ nullable: true })
  packageKms: number; // e.g. 80

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  basePackageRate: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  extraHourRate: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  extraKmRate: number;

  // Airport Transfer / Route specific
  @Column({ nullable: true })
  pickupLocation: string;

  @Column({ nullable: true })
  dropLocation: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  flatRate: number;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  vendorId: string;

  @ManyToOne(() => CabVendor, (vendor) => vendor.pricingRules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vendorId' })
  vendor: CabVendor;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
