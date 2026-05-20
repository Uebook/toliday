import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { VerticalType } from '../..//common/enums/vertical.enum';

export enum PromotionType {
    BASIC = 'BASIC',
    EARLY_BIRD = 'EARLY_BIRD',
    LAST_MINUTE = 'LAST_MINUTE',
    GEO_TARGETED = 'GEO_TARGETED',
}

@Entity('promotions')
export class Promotion {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: PromotionType,
        default: PromotionType.BASIC
    })
    type: PromotionType;

    @Column({
        type: 'enum',
        enum: VerticalType
    })
    vertical: VerticalType;

    @Column()
    vendorId: string; // References the specific vendor (hotelId, tourPartnerId, etc.)

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    discountPercentage: number;

    @Column({ type: 'date', nullable: true })
    bookingStartDate: string;

    @Column({ type: 'date', nullable: true })
    bookingEndDate: string;

    @Column({ type: 'date', nullable: true })
    stayStartDate: string;

    @Column({ type: 'date', nullable: true })
    stayEndDate: string;

    @Column({ type: 'int', default: 0 })
    minAdvanceDays: number; // For early bird

    @Column({ type: 'int', default: 0 })
    maxAdvanceDays: number; // For last minute

    @Column({ nullable: true })
    targetRegion: string; // For geo-targeted

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isVerified: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
