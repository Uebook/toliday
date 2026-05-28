import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Hotel } from '../../hotel/entities/hotel.entity';

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  hotelId: string;

  @ManyToOne(() => Hotel, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'hotelId' })
  hotel: Hotel;

  @Column({ nullable: true })
  tourPartnerId: string;

  @Column({ nullable: true })
  packageId: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ default: 'General' })
  category: string;

  @Column({ nullable: true })
  size: string;

  @CreateDateColumn()
  createdAt: Date;
}
