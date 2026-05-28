import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Hotel } from '../../hotel/entities/hotel.entity';

@Entity('notification_settings')
export class NotificationSetting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hotelId: string;

  @OneToOne(() => Hotel, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hotelId' })
  hotel: Hotel;

  @Column({ default: true })
  newBookings: boolean;

  @Column({ default: true })
  cancellations: boolean;

  @Column({ default: true })
  paymentUpdates: boolean;

  @Column({ default: true })
  inventoryAlerts: boolean;

  @Column({ default: false })
  checkInReminders: boolean;

  @Column({ default: false })
  rateSuggestions: boolean;
}
