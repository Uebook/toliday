import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
export class BookingService {
       constructor(
              @InjectRepository(Booking)
              private bookingRepository: Repository<Booking>,
              private inventoryService: InventoryService,
              private dataSource: DataSource,
       ) { }

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
                            queryRunner.manager
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

       async findAll(hotelId: string): Promise<Booking[]> {
              return this.bookingRepository.find({
                     where: { hotelId },
                     relations: ['roomType'],
                     order: { createdAt: 'DESC' }
              });
       }

       async findOne(id: string, hotelId: string): Promise<Booking> {
              const booking = await this.bookingRepository.findOne({
                     where: { id, hotelId },
                     relations: ['roomType']
              });
              if (!booking) {
                     throw new NotFoundException(`Booking with ID ${id} not found.`);
              }
              return booking;
       }

       async updateStatus(id: string, hotelId: string, updateDto: UpdateBookingStatusDto): Promise<Booking> {
              const booking = await this.findOne(id, hotelId);
              booking.status = updateDto.status;
              return this.bookingRepository.save(booking);
       }

       // Tour Partner Methods
       async findAllForTourPartner(tourPartnerId: string): Promise<Booking[]> {
              return this.bookingRepository.find({
                     where: { tourPartnerId },
                     order: { createdAt: 'DESC' }
              });
       }

       async findOneForTourPartner(id: string, tourPartnerId: string): Promise<Booking> {
              const booking = await this.bookingRepository.findOne({
                     where: { id, tourPartnerId }
              });
              if (!booking) throw new NotFoundException(`Booking not found`);
              return booking;
       }

       async updateStatusForTourPartner(id: string, tourPartnerId: string, status: BookingStatus): Promise<Booking> {
              const booking = await this.findOneForTourPartner(id, tourPartnerId);
              booking.status = status;
              return this.bookingRepository.save(booking);
       }
}

