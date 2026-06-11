import {
  Injectable,
  NotFoundException,
  BadRequestException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { InventoryService } from '../inventory/inventory.service';
import { LedgerEntry, LedgerEntryType, VerticalType } from '../finance/entities/ledger-entry.entity';
import { Notification, NotificationType } from '../notifications/entities/notification.entity';

@Injectable()
export class BookingService implements OnModuleInit {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private inventoryService: InventoryService,
    private dataSource: DataSource,
  ) {}

  async create(hotelId: string, createDto: CreateBookingDto): Promise<Booking> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Verify and Reduce Inventory
      await this.inventoryService.reduceInventory(
        createDto.roomTypeId,
        createDto.startDate,
        createDto.endDate,
        1, // Assuming 1 room per booking for now
        queryRunner.manager,
      );

      // 2. Create Booking
      const booking = this.bookingRepository.create({
        ...createDto,
        hotelId,
        status: BookingStatus.CONFIRMED,
      });
      const savedBooking = await queryRunner.manager.save(booking);

      await queryRunner.commitTransaction();
      return savedBooking;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // Public booking from the consumer website (no JWT required)
  async createPublic(createDto: CreateBookingDto & { hotelId: string }): Promise<Booking> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.inventoryService.reduceInventory(
        createDto.roomTypeId,
        createDto.startDate,
        createDto.endDate,
        1,
        queryRunner.manager,
      );

      const ref = 'BK-' + Math.random().toString(36).substring(2, 10).toUpperCase();

      const booking = this.bookingRepository.create({
        guestName: createDto.guestName,
        guestEmail: createDto.guestEmail,
        guestContact: createDto.guestContact,
        startDate: createDto.startDate,
        endDate: createDto.endDate,
        numberOfGuests: createDto.numberOfGuests,
        totalAmount: createDto.totalAmount,
        roomTypeId: createDto.roomTypeId,
        hotelId: createDto.hotelId,
        status: BookingStatus.PENDING,
        bookingReference: ref,
      });

      const saved = await queryRunner.manager.save(booking);

      // 3. Create Ledger Entry for Hotel Revenue
      const ledgerEntry = queryRunner.manager.create(LedgerEntry, {
        vendorId: createDto.hotelId,
        vertical: VerticalType.HOTEL,
        type: LedgerEntryType.CREDIT,
        amount: createDto.totalAmount,
        description: `Booking Revenue (${ref}) - ${createDto.guestName}`,
        referenceId: saved.id,
        status: 'COMPLETED',
      });
      await queryRunner.manager.save(ledgerEntry);

      // 4. Create Notification
      const notification = queryRunner.manager.create(Notification, {
        hotelId: createDto.hotelId,
        type: NotificationType.BOOKING,
        title: 'New Booking Received!',
        message: `You have a new booking (${ref}) from ${createDto.guestName} for ${createDto.startDate} to ${createDto.endDate}.`,
      });
      await queryRunner.manager.save(notification);

      await queryRunner.commitTransaction();
      return saved;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAllByEmail(guestEmail: string): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { guestEmail },
      relations: ['roomType', 'hotel'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAll(hotelId: string): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { hotelId },
      relations: ['roomType'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAllGlobal(): Promise<Booking[]> {
    return this.bookingRepository.find({
      relations: ['roomType', 'hotel', 'tourPartner', 'busVendor', 'cabVendor'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, hotelId?: string): Promise<Booking> {
    const whereClause: any = { id };
    if (hotelId) {
      whereClause.hotelId = hotelId;
    }
    
    const booking = await this.bookingRepository.findOne({
      where: whereClause,
      relations: ['roomType', 'assignedRoom'],
    });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found.`);
    }
    return booking;
  }

  onModuleInit() {
    // Run cleanup job every 1 minute
    setInterval(() => {
      this.cleanupExpiredPendingBookings().catch((err) => {
        console.error('Error in expired pending bookings cleanup job:', err);
      });
    }, 60000);
  }

  async cleanupExpiredPendingBookings() {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const expiredBookings = await this.bookingRepository
      .createQueryBuilder('booking')
      .where('booking.status = :status', { status: BookingStatus.PENDING })
      .andWhere('booking.createdAt <= :tenMinutesAgo', { tenMinutesAgo })
      .getMany();

    if (expiredBookings.length === 0) return;

    console.log(
      `Found ${expiredBookings.length} expired pending bookings. Cleaning up...`,
    );

    for (const booking of expiredBookings) {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        if (booking.roomTypeId && booking.startDate && booking.endDate) {
          await this.inventoryService.increaseInventory(
            booking.roomTypeId,
            booking.startDate,
            booking.endDate,
            1,
            queryRunner.manager,
          );
        }

        booking.status = BookingStatus.CANCELLED;
        await queryRunner.manager.save(booking);
        await queryRunner.commitTransaction();
        console.log(
          `Cancelled expired booking: ${booking.id} and restored inventory.`,
        );
      } catch (err) {
        await queryRunner.rollbackTransaction();
        console.error(`Failed to cancel expired booking ${booking.id}:`, err);
      } finally {
        await queryRunner.release();
      }
    }
  }

  async updateStatus(
    id: string,
    hotelId: string | undefined,
    updateDto: UpdateBookingStatusDto,
  ): Promise<Booking> {
    const booking = await this.findOne(id, hotelId);

    if (
      updateDto.status === BookingStatus.CANCELLED &&
      booking.status !== BookingStatus.CANCELLED
    ) {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        if (booking.roomTypeId && booking.startDate && booking.endDate) {
          await this.inventoryService.increaseInventory(
            booking.roomTypeId,
            booking.startDate,
            booking.endDate,
            1,
            queryRunner.manager,
          );
        }
        booking.status = updateDto.status;
        const savedBooking = await queryRunner.manager.save(booking);
        await queryRunner.commitTransaction();
        return savedBooking;
      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
      } finally {
        await queryRunner.release();
      }
    }

    booking.status = updateDto.status;
    return this.bookingRepository.save(booking);
  }

  // Tour Partner Methods
  async findAllForTourPartner(tourPartnerId: string): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { tourPartnerId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOneForTourPartner(
    id: string,
    tourPartnerId: string,
  ): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id, tourPartnerId },
    });
    if (!booking) throw new NotFoundException(`Booking not found`);
    return booking;
  }

  async updateStatusForTourPartner(
    id: string,
    tourPartnerId: string,
    status: BookingStatus,
  ): Promise<Booking> {
    const booking = await this.findOneForTourPartner(id, tourPartnerId);

    if (
      status === BookingStatus.CANCELLED &&
      booking.status !== BookingStatus.CANCELLED
    ) {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        if (booking.roomTypeId && booking.startDate && booking.endDate) {
          await this.inventoryService.increaseInventory(
            booking.roomTypeId,
            booking.startDate,
            booking.endDate,
            1,
            queryRunner.manager,
          );
        }
        booking.status = status;
        const savedBooking = await queryRunner.manager.save(booking);
        await queryRunner.commitTransaction();
        return savedBooking;
      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
      } finally {
        await queryRunner.release();
      }
    }

    booking.status = status;
    return this.bookingRepository.save(booking);
  }

  async assignRoom(
    id: string,
    hotelId: string,
    roomId: string,
  ): Promise<Booking> {
    const booking = await this.findOne(id, hotelId);
    booking.assignedRoomId = roomId;
    return this.bookingRepository.save(booking);
  }

  async getAdminConsumers() {
    const consumers = await this.bookingRepository
      .createQueryBuilder('booking')
      .select('booking.guestEmail', 'email')
      .addSelect('MAX(booking.guestName)', 'name')
      .addSelect('MAX(booking.guestContact)', 'phone')
      .addSelect('COUNT(booking.id)', 'totalBookings')
      .addSelect('SUM(booking.totalAmount)', 'ltv')
      .addSelect('MAX(booking.createdAt)', 'lastActive')
      .groupBy('booking.guestEmail')
      .getRawMany();

    return consumers.map(c => ({
      id: c.email,
      name: c.name,
      email: c.email,
      phone: c.phone || 'N/A',
      totalBookings: parseInt(c.totalBookings, 10),
      ltv: parseFloat(c.ltv),
      status: 'ACTIVE',
      lastActive: c.lastActive,
      kycStatus: 'VERIFIED',
    }));
  }

}
