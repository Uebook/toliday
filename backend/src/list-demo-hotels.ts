import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Hotel } from './hotel/entities/hotel.entity';
import { Staff } from './staff/entities/staff.entity';
import { Room } from './room/entities/room.entity';
import { Repository } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const hotelRepo: Repository<Hotel> = app.get('HotelRepository');
  const staffRepo: Repository<Staff> = app.get('StaffRepository');
  const roomRepo: Repository<Room> = app.get('RoomRepository');

  const hotels = await hotelRepo.find({
    relations: ['roomTypes'],
  });

  const hotelStats: any[] = [];

  for (const hotel of hotels) {
    const staff = await staffRepo.find({ where: { hotelId: hotel.id } });
    const roomTypeIds = hotel.roomTypes?.map((rt: any) => rt.id) || [];
    let rooms: any[] = [];
    if (roomTypeIds.length > 0) {
      rooms = await roomRepo.find({
        where: roomTypeIds.map(id => ({ roomTypeId: id })),
      });
    }

    hotelStats.push({
      hotelName: hotel.name,
      city: hotel.city,
      staffEmails: staff.map(s => s.email).filter(e => e),
      roomTypesCount: hotel.roomTypes?.length || 0,
      totalRoomsCount: rooms.length,
      hasData: (hotel.roomTypes?.length > 0 || rooms.length > 0) ? true : false,
    });
  }

  // Sort by most data
  hotelStats.sort((a, b) => b.totalRoomsCount - a.totalRoomsCount || b.roomTypesCount - a.roomTypesCount);

  console.log('--- HOTELS WITH DATA FOR DEMO ---');
  for (const stat of hotelStats) {
    if (stat.hasData || stat.staffEmails.length > 0) {
      console.log(`\n🏨 Hotel: ${stat.hotelName} (${stat.city})`);
      console.log(`   - Login Emails: ${stat.staffEmails.length > 0 ? stat.staffEmails.join(', ') : 'None'}`);
      console.log(`   - Room Categories: ${stat.roomTypesCount}`);
      console.log(`   - Total Physical Rooms: ${stat.totalRoomsCount}`);
    }
  }

  await app.close();
}

bootstrap();
