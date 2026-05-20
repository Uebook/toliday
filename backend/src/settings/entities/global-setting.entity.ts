import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('global_settings')
export class GlobalSetting {
       @PrimaryGeneratedColumn('uuid')
       id: string;

       @Column({ unique: true })
       key: string;

       @Column()
       value: string;

       @Column({ nullable: true })
       description: string;

       @Column({ default: 'GENERAL' })
       category: string; // FINANCE, SYSTEM, NOTIFICATION

       @UpdateDateColumn()
       updatedAt: Date;
}
