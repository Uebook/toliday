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

@Entity('itinerary_activities')
export class ItineraryActivity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  day: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'json', nullable: true })
  inclusions: string[];

  @Column({ type: 'json', nullable: true })
  images: string[];

  @Column()
  packageId: string;

  @ManyToOne(() => TourPackage, (pkg) => pkg.structuredItinerary, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'packageId' })
  package: TourPackage;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
