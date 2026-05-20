import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RoomType } from '../../room-type/entities/room-type.entity';

@Entity('inventories')
export class Inventory {
       @PrimaryGeneratedColumn('uuid')
       id: string;

       @Column({ type: 'date' })
       date: string; // The date this inventory refers to

       @Column('int')
       totalRooms: number;

       @Column('int')
       availableRooms: number;

       @Column('decimal', { precision: 10, scale: 2, nullable: true })
       priceOverride: number;

       @Column()
       roomTypeId: string;

       @ManyToOne(() => RoomType, (roomType) => roomType.inventories, { onDelete: 'CASCADE' })
       @JoinColumn({ name: 'roomTypeId' })
       roomType: RoomType;

       @CreateDateColumn()
       createdAt: Date;

       @UpdateDateColumn()
       updatedAt: Date;
}
