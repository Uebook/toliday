import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { TourPartner } from './tour-partner.entity';
import { ItineraryActivity } from './itinerary-activity.entity';
import { Lead } from './lead.entity';
import { PackageDeparture } from './package-departure.entity';
import { PackageTier } from './package-tier.entity';

export enum PackageStatus {
  ACTIVE = 'ACTIVE',
  DRAFT = 'DRAFT',
  INACTIVE = 'INACTIVE',
}

@Entity('tour_packages')
export class TourPackage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'simple-array', nullable: true })
  destinations: string[];

  @Column({ nullable: true })
  duration: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  basePrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salePrice: number;

  @Column({ type: 'simple-array', nullable: true })
  inclusions: string[];

  @Column({ type: 'simple-array', nullable: true })
  exclusions: string[];

  @Column({ type: 'simple-array', nullable: true })
  images: string[];

  @Column({ type: 'json', nullable: true })
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];

  @Column({
    type: 'enum',
    enum: PackageStatus,
    default: PackageStatus.DRAFT,
  })
  status: PackageStatus;

  @Column({ nullable: true })
  category: string;

  @Column()
  partnerId: string;

  @ManyToOne(() => TourPartner, (partner) => partner.packages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'partnerId' })
  partner: TourPartner;

  @OneToMany(() => ItineraryActivity, (activity) => activity.package)
  structuredItinerary: ItineraryActivity[];

  @OneToMany(() => Lead, (lead) => lead.package)
  leads: Lead[];

  @OneToMany(() => PackageDeparture, (departure) => departure.tourPackage)
  departures: PackageDeparture[];

  @OneToMany(() => PackageTier, (tier) => tier.tourPackage)
  pricingTiers: PackageTier[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
