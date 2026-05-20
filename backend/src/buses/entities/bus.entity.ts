import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BusVendor } from './bus-vendor.entity';
import { BusSchedule } from './bus-schedule.entity';
import { SeatLayout } from './seat-layout.entity';
import { YieldRule } from './yield-rule.entity';

export enum BusType {
    AC_SLEEPER = 'AC_SLEEPER',
    NON_AC_SLEEPER = 'NON_AC_SLEEPER',
    AC_SEATER = 'AC_SEATER',
    NON_AC_SEATER = 'NON_AC_SEATER',
    VOLVO_AC_SEATER = 'VOLVO_AC_SEATER'
}

@Entity('buses')
export class Bus {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    registrationNumber: string;

    @Column({
        type: 'enum',
        enum: BusType,
        default: BusType.AC_SEATER
    })
    type: BusType;

    @Column({ type: 'int' })
    totalSeats: number;

    @Column({ type: 'simple-array', nullable: true })
    amenities: string[];

    @Column({ nullable: true })
    vendorId: string;

    @ManyToOne(() => BusVendor, (vendor) => vendor.buses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'vendorId' })
    vendor: BusVendor;

    @OneToMany(() => BusSchedule, (schedule) => schedule.bus)
    schedules: BusSchedule[];

    @OneToMany(() => SeatLayout, (layout) => layout.bus)
    seatLayouts: SeatLayout[];

    @OneToMany(() => YieldRule, (rule) => rule.bus)
    yieldRules: YieldRule[];

    @Column({ nullable: true })
    gpsDeviceId: string;

    @Column({ nullable: true })
    gpsProvider: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
