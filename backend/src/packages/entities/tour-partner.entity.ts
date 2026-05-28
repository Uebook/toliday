import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Staff } from '../../staff/entities/staff.entity';
import { Tour } from './tour.entity';
import { TourPackage } from './tour-package.entity';
import { Lead } from './lead.entity';

export enum PartnerStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  BLOCKED = 'BLOCKED',
}

@Entity('tour_partners')
export class TourPartner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  businessName: string;

  @Column({ nullable: true })
  businessType: string; // e.g. Tour Operator, Travel Agency, Local Guide

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  yearsInOperation: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  operatingArea: string;

  @Column({ nullable: true })
  address: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  contactNumber: string;

  @Column({ nullable: true })
  gstNumber: string;

  @Column({ nullable: true })
  panNumber: string;

  @Column({ nullable: true })
  registrationNumber: string;

  // Docs
  @Column({ nullable: true })
  gstDoc: string;

  @Column({ nullable: true })
  panDoc: string;

  @Column({ nullable: true })
  licenseDoc: string;

  @Column({ nullable: true })
  chequeDoc: string;

  // Bank details
  @Column({ nullable: true })
  bankHolder: string;

  @Column({ nullable: true })
  bankName: string;

  @Column({ nullable: true })
  bankAccount: string;

  @Column({ nullable: true })
  bankIfsc: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({
    type: 'enum',
    enum: PartnerStatus,
    default: PartnerStatus.PENDING,
  })
  status: PartnerStatus;

  @OneToMany(() => Staff, (staff) => staff.tourPartner)
  staffs: Staff[];

  @OneToMany(() => Lead, (lead) => lead.partner)
  leads: Lead[];

  @OneToMany(() => Tour, (tour) => tour.partner)
  tours: Tour[];

  @OneToMany(() => TourPackage, (tp) => tp.partner)
  packages: TourPackage[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
