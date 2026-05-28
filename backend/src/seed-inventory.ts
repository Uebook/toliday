import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InventoryService } from './inventory/inventory.service';
import { RoomType } from './room-type/entities/room-type.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const roomTypeRepo = app.get('RoomTypeRepository');
  const inventoryService = app.get(InventoryService);

  console.log('Fetching all room types...');
  const rooms = await roomTypeRepo.find();
  
  if (rooms.length === 0) {
    console.log('No rooms found. Run seed-data.ts first.');
    await app.close();
    return;
  }

  // Create inventory for next 60 days
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 60);
  
  const startStr = startDate.toISOString().split('T')[0];
  const endStr = endDate.toISOString().split('T')[0];

  console.log(`Seeding inventory from ${startStr} to ${endStr}...`);

  for (const room of rooms) {
    console.log(`Setting inventory for room ${room.id} (Hotel: ${room.hotelId})...`);
    await inventoryService.bulkUpdate(room.hotelId, {
      roomTypeId: room.id,
      startDate: startStr,
      endDate: endStr,
      totalRooms: 10, // Give every room 10 available slots per day
    });
  }

  console.log('Inventory seeding completed successfully!');
  await app.close();
}

bootstrap();
