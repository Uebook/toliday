import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum VerticalType {
  HOTEL = 'HOTEL',
  PACKAGE = 'PACKAGE',
  BUS = 'BUS',
  CAB = 'CAB',
}

@Entity('global_reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  vendorId: string; // Generic ID reference to Hotel/Partner/Bus/Cab vendor

  @Column({
    type: 'enum',
    enum: VerticalType,
  })
  vertical: VerticalType;

  @Column()
  vendorName: string;

  @Column()
  guestName: string;

  @Column({ type: 'int' })
  rating: number; // 1 to 5

  @Column({ type: 'text' })
  comment: string;

  @Column({ default: 'PENDING' })
  status: string; // PENDING, PUBLISHED, REJECTED

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
