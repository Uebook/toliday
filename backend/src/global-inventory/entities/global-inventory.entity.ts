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

@Entity('global_inventories')
export class GlobalInventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  vendorId: string; // Generic vendor ID

  @Column({
    type: 'enum',
    enum: VerticalType,
  })
  vertical: VerticalType;

  @Column()
  resourceId: string; // Generic ID for RoomType, BusRoute, TourPackage, etc.

  @Column()
  resourceName: string; // Name of the resource (e.g. "Deluxe Ocean View")

  @Column({ type: 'date' })
  date: string; // The date this inventory refers to

  @Column('int')
  totalUnits: number;

  @Column('int')
  availableUnits: number;

  @Column('decimal', { precision: 10, scale: 2 })
  basePrice: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  priceOverride: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
