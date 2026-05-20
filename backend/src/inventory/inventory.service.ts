import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { RoomType } from '../room-type/entities/room-type.entity';

@Injectable()
export class InventoryService {
       constructor(
              @InjectRepository(Inventory)
              private inventoryRepository: Repository<Inventory>,
       ) { }

       async bulkUpdate(hotelId: string, updateDto: UpdateInventoryDto) {
              const { roomTypeId, startDate, endDate, totalRooms, priceOverride } = updateDto;

              // Verify that the roomTypeId belongs to the hotelId provided
              const roomType = await this.inventoryRepository.manager.getRepository(RoomType).findOne({
                     where: { id: roomTypeId, hotelId }
              });

              if (!roomType) {
                     throw new NotFoundException(`Room type not found for this hotel.`);
              }
              const start = new Date(startDate);
              const end = new Date(endDate);

              const recordsToSave: Inventory[] = [];

              // Loop through each day
              for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
                     const dateStr = dt.toISOString().split('T')[0];

                     let inventory = await this.inventoryRepository.findOne({
                            where: { roomTypeId, date: dateStr }
                     });

                     if (!inventory) {
                            inventory = this.inventoryRepository.create({
                                   roomTypeId,
                                   date: dateStr,
                                   totalRooms,
                                   availableRooms: totalRooms, // new inventory assumes fully available
                                   priceOverride
                            });
                     } else {
                            // Adjust available rooms based on difference if updating
                            const booked = inventory.totalRooms - inventory.availableRooms;
                            inventory.totalRooms = totalRooms;
                            inventory.availableRooms = Math.max(0, totalRooms - booked);

                            if (priceOverride !== undefined) {
                                   inventory.priceOverride = priceOverride;
                            }
                     }
                     recordsToSave.push(inventory);
              }

              await this.inventoryRepository.save(recordsToSave);
              return { message: `Updated inventory for ${recordsToSave.length} days.` };
       }

       async getInventory(roomTypeId: string, startDate: string, endDate: string) {
              return this.inventoryRepository
                     .createQueryBuilder('inv')
                     .where('inv.roomTypeId = :roomTypeId', { roomTypeId })
                     .andWhere('inv.date >= :startDate', { startDate })
                     .andWhere('inv.date <= :endDate', { endDate })
                     .getMany();
       }

       async reduceInventory(roomTypeId: string, startDate: string, endDate: string, count: number, manager?: any) {
              const repo = manager ? manager.getRepository(Inventory) : this.inventoryRepository;

              // Get all inventory records for the range
              const start = new Date(startDate);
              const end = new Date(endDate);
              const records: Inventory[] = [];

              for (let dt = new Date(start); dt < end; dt.setDate(dt.getDate() + 1)) {
                     const dateStr = dt.toISOString().split('T')[0];
                     const inv = await repo.findOne({ 
                            where: { roomTypeId, date: dateStr },
                            lock: { mode: 'pessimistic_write' }
                     });

                     if (!inv || inv.availableRooms < count) {
                            throw new BadRequestException(`Rooms not available for date: ${dateStr}`);
                     }
                     inv.availableRooms -= count;
                     records.push(inv);
              }

              await repo.save(records);
       }

       async increaseInventory(roomTypeId: string, startDate: string, endDate: string, count: number, manager?: any) {
              const repo = manager ? manager.getRepository(Inventory) : this.inventoryRepository;
              const start = new Date(startDate);
              const end = new Date(endDate);
              const records: Inventory[] = [];

              for (let dt = new Date(start); dt < end; dt.setDate(dt.getDate() + 1)) {
                     const dateStr = dt.toISOString().split('T')[0];
                     const inv = await repo.findOne({ where: { roomTypeId, date: dateStr } });
                     if (inv) {
                            inv.availableRooms += count;
                            records.push(inv);
                     }
              }

              await repo.save(records);
       }
}
