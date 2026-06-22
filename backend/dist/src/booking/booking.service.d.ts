import { OnModuleInit } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { InventoryService } from '../inventory/inventory.service';
import { WhatsappService } from '../whatsapp/whatsapp.service';
export declare class BookingService implements OnModuleInit {
    private bookingRepository;
    private inventoryService;
    private dataSource;
    private whatsappService;
    private readonly logger;
    constructor(bookingRepository: Repository<Booking>, inventoryService: InventoryService, dataSource: DataSource, whatsappService: WhatsappService);
    create(hotelId: string, createDto: CreateBookingDto): Promise<Booking>;
    createPublic(createDto: CreateBookingDto & {
        hotelId: string;
    }): Promise<Booking>;
    findAllByEmail(guestEmail: string): Promise<Booking[]>;
    findAll(hotelId: string): Promise<Booking[]>;
    findAllGlobal(): Promise<Booking[]>;
    findOne(id: string, hotelId?: string): Promise<Booking>;
    onModuleInit(): void;
    cleanupExpiredPendingBookings(): Promise<void>;
    handleCheckInReminders(): Promise<void>;
    handleCheckOutReminders(): Promise<void>;
    updateStatus(id: string, hotelId: string | undefined, updateDto: UpdateBookingStatusDto): Promise<Booking>;
    findAllForTourPartner(tourPartnerId: string): Promise<Booking[]>;
    findOneForTourPartner(id: string, tourPartnerId: string): Promise<Booking>;
    updateStatusForTourPartner(id: string, tourPartnerId: string, status: BookingStatus): Promise<Booking>;
    assignRoom(id: string, hotelId: string, roomId: string): Promise<Booking>;
    getAdminConsumers(): Promise<{
        id: any;
        name: any;
        email: any;
        phone: any;
        totalBookings: number;
        ltv: number;
        status: string;
        lastActive: any;
        kycStatus: string;
    }[]>;
}
