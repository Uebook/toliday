import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Driver } from './driver.entity';
import { CabPricing } from './cab-pricing.entity';

@Entity('cab_vendors')
export class CabVendor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  companyName: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  gstNumber: string;

  @Column({ nullable: true })
  panNumber: string;

  @Column({ default: false })
  isVerified: boolean;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.vendor)
  vehicles: Vehicle[];

  @OneToMany(() => Driver, (driver) => driver.vendor)
  drivers: Driver[];

  @OneToMany(() => CabPricing, (pricing) => pricing.vendor)
  pricingRules: CabPricing[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
