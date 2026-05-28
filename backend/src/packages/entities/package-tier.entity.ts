import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TourPackage } from './tour-package.entity';

@Entity('package_tiers')
export class PackageTier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // e.g., "Couple", "Group of 4", "Group of 10+"

  @Column({ type: 'int' })
  paxMin: number;

  @Column({ type: 'int' })
  paxMax: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerPerson: number;

  @Column()
  packageId: string;

  @ManyToOne(() => TourPackage, (tourPackage) => tourPackage.pricingTiers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'packageId' })
  tourPackage: TourPackage;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
