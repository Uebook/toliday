import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Bus } from './bus.entity';

export enum DeckType {
    LOWER = 'LOWER',
    UPPER = 'UPPER'
}

export enum SeatType {
    SEATER = 'SEATER',
    SLEEPER = 'SLEEPER',
    SEMI_SLEEPER = 'SEMI_SLEEPER'
}

@Entity('bus_seat_layouts')
export class SeatLayout {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    busId: string;

    @ManyToOne(() => Bus, (bus) => bus.seatLayouts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'busId' })
    bus: Bus;

    @Column({
        type: 'enum',
        enum: DeckType,
        default: DeckType.LOWER
    })
    deck: DeckType;

    @Column({ type: 'int' })
    row: number;

    @Column({ type: 'int' })
    column: number;

    @Column({
        type: 'enum',
        enum: SeatType,
        default: SeatType.SEATER
    })
    seatType: SeatType;

    @Column()
    seatName: string; // e.g., L1, U2

    @Column({ default: false })
    isLadiesSeat: boolean;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
