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

@Entity('package_departures')
export class PackageDeparture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'int' })
  totalSeats: number;

  @Column({ type: 'int' })
  availableSeats: number;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  packageId: string;

  @ManyToOne(() => TourPackage, (tourPackage) => tourPackage.departures, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'packageId' })
  tourPackage: TourPackage;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
