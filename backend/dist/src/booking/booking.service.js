"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("./entities/booking.entity");
const inventory_service_1 = require("../inventory/inventory.service");
const ledger_entry_entity_1 = require("../finance/entities/ledger-entry.entity");
const notification_entity_1 = require("../notifications/entities/notification.entity");
let BookingService = class BookingService {
    bookingRepository;
    inventoryService;
    dataSource;
    constructor(bookingRepository, inventoryService, dataSource) {
        this.bookingRepository = bookingRepository;
        this.inventoryService = inventoryService;
        this.dataSource = dataSource;
    }
    async create(hotelId, createDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.inventoryService.reduceInventory(createDto.roomTypeId, createDto.startDate, createDto.endDate, 1, queryRunner.manager);
            const booking = this.bookingRepository.create({
                ...createDto,
                hotelId,
                status: booking_entity_1.BookingStatus.CONFIRMED,
            });
            const savedBooking = await queryRunner.manager.save(booking);
            await queryRunner.commitTransaction();
            return savedBooking;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async createPublic(createDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.inventoryService.reduceInventory(createDto.roomTypeId, createDto.startDate, createDto.endDate, 1, queryRunner.manager);
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
                status: booking_entity_1.BookingStatus.PENDING,
                bookingReference: ref,
            });
            const saved = await queryRunner.manager.save(booking);
            const ledgerEntry = queryRunner.manager.create(ledger_entry_entity_1.LedgerEntry, {
                vendorId: createDto.hotelId,
                vertical: ledger_entry_entity_1.VerticalType.HOTEL,
                type: ledger_entry_entity_1.LedgerEntryType.CREDIT,
                amount: createDto.totalAmount,
                description: `Booking Revenue (${ref}) - ${createDto.guestName}`,
                referenceId: saved.id,
                status: 'COMPLETED',
            });
            await queryRunner.manager.save(ledgerEntry);
            const notification = queryRunner.manager.create(notification_entity_1.Notification, {
                hotelId: createDto.hotelId,
                type: notification_entity_1.NotificationType.BOOKING,
                title: 'New Booking Received!',
                message: `You have a new booking (${ref}) from ${createDto.guestName} for ${createDto.startDate} to ${createDto.endDate}.`,
            });
            await queryRunner.manager.save(notification);
            await queryRunner.commitTransaction();
            return saved;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAllByEmail(guestEmail) {
        return this.bookingRepository.find({
            where: { guestEmail },
            relations: ['roomType', 'hotel'],
            order: { createdAt: 'DESC' },
        });
    }
    async findAll(hotelId) {
        return this.bookingRepository.find({
            where: { hotelId },
            relations: ['roomType'],
            order: { createdAt: 'DESC' },
        });
    }
    async findAllGlobal() {
        return this.bookingRepository.find({
            relations: ['roomType', 'hotel', 'tourPartner', 'busVendor', 'cabVendor'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id, hotelId) {
        const whereClause = { id };
        if (hotelId) {
            whereClause.hotelId = hotelId;
        }
        const booking = await this.bookingRepository.findOne({
            where: whereClause,
            relations: ['roomType', 'assignedRoom'],
        });
        if (!booking) {
            throw new common_1.NotFoundException(`Booking with ID ${id} not found.`);
        }
        return booking;
    }
    onModuleInit() {
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
            .where('booking.status = :status', { status: booking_entity_1.BookingStatus.PENDING })
            .andWhere('booking.createdAt <= :tenMinutesAgo', { tenMinutesAgo })
            .getMany();
        if (expiredBookings.length === 0)
            return;
        console.log(`Found ${expiredBookings.length} expired pending bookings. Cleaning up...`);
        for (const booking of expiredBookings) {
            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            try {
                if (booking.roomTypeId && booking.startDate && booking.endDate) {
                    await this.inventoryService.increaseInventory(booking.roomTypeId, booking.startDate, booking.endDate, 1, queryRunner.manager);
                }
                booking.status = booking_entity_1.BookingStatus.CANCELLED;
                await queryRunner.manager.save(booking);
                await queryRunner.commitTransaction();
                console.log(`Cancelled expired booking: ${booking.id} and restored inventory.`);
            }
            catch (err) {
                await queryRunner.rollbackTransaction();
                console.error(`Failed to cancel expired booking ${booking.id}:`, err);
            }
            finally {
                await queryRunner.release();
            }
        }
    }
    async updateStatus(id, hotelId, updateDto) {
        const booking = await this.findOne(id, hotelId);
        if (updateDto.status === booking_entity_1.BookingStatus.CANCELLED &&
            booking.status !== booking_entity_1.BookingStatus.CANCELLED) {
            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            try {
                if (booking.roomTypeId && booking.startDate && booking.endDate) {
                    await this.inventoryService.increaseInventory(booking.roomTypeId, booking.startDate, booking.endDate, 1, queryRunner.manager);
                }
                booking.status = updateDto.status;
                const savedBooking = await queryRunner.manager.save(booking);
                await queryRunner.commitTransaction();
                return savedBooking;
            }
            catch (err) {
                await queryRunner.rollbackTransaction();
                throw err;
            }
            finally {
                await queryRunner.release();
            }
        }
        booking.status = updateDto.status;
        return this.bookingRepository.save(booking);
    }
    async findAllForTourPartner(tourPartnerId) {
        return this.bookingRepository.find({
            where: { tourPartnerId },
            order: { createdAt: 'DESC' },
        });
    }
    async findOneForTourPartner(id, tourPartnerId) {
        const booking = await this.bookingRepository.findOne({
            where: { id, tourPartnerId },
        });
        if (!booking)
            throw new common_1.NotFoundException(`Booking not found`);
        return booking;
    }
    async updateStatusForTourPartner(id, tourPartnerId, status) {
        const booking = await this.findOneForTourPartner(id, tourPartnerId);
        if (status === booking_entity_1.BookingStatus.CANCELLED &&
            booking.status !== booking_entity_1.BookingStatus.CANCELLED) {
            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            try {
                if (booking.roomTypeId && booking.startDate && booking.endDate) {
                    await this.inventoryService.increaseInventory(booking.roomTypeId, booking.startDate, booking.endDate, 1, queryRunner.manager);
                }
                booking.status = status;
                const savedBooking = await queryRunner.manager.save(booking);
                await queryRunner.commitTransaction();
                return savedBooking;
            }
            catch (err) {
                await queryRunner.rollbackTransaction();
                throw err;
            }
            finally {
                await queryRunner.release();
            }
        }
        booking.status = status;
        return this.bookingRepository.save(booking);
    }
    async assignRoom(id, hotelId, roomId) {
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
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        inventory_service_1.InventoryService,
        typeorm_2.DataSource])
], BookingService);
//# sourceMappingURL=booking.service.js.map