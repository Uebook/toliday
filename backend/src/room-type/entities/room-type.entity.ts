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
import { Hotel } from '../../hotel/entities/hotel.entity';
import { Inventory } from '../../inventory/entities/inventory.entity';
import { Booking } from '../../booking/entities/booking.entity';
import { RatePlan } from '../../hotel/entities/rate-plan.entity';
import { Room } from '../../room/entities/room.entity';

@Entity('room_types')
export class RoomType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  capacity: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  extraPersonPrice: number;

  @Column({ type: 'varchar', nullable: true })
  size: string;

  @Column({ type: 'jsonb', nullable: true })
  amenities: string[];

  @Column({ type: 'jsonb', nullable: true })
  images: string[];

  @Column({ type: 'int', default: 10 })
  totalRooms: number;

  @Column()
  hotelId: string;

  @ManyToOne(() => Hotel, (hotel) => hotel.roomTypes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hotelId' })
  hotel: Hotel;

  @OneToMany(() => Inventory, (inventory) => inventory.roomType)
  inventories: Inventory[];

  @OneToMany(() => Booking, (booking) => booking.roomType)
  bookings: Booking[];

  @OneToMany(() => RatePlan, (ratePlan) => ratePlan.roomType)
  ratePlans: RatePlan[];

  @OneToMany(() => Room, (room) => room.roomType)
  rooms: Room[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
