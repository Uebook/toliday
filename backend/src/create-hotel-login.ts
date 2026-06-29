import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Hotel } from './hotel/entities/hotel.entity';
import { Staff, StaffRole } from './staff/entities/staff.entity';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const hotelRepo = app.get('HotelRepository');
  const staffRepo = app.get('StaffRepository');

  // Find the Noida hotel
  let hotel = await hotelRepo.findOne({ where: { city: 'Noida (NCR)' } });
  if (!hotel) {
    hotel = await hotelRepo.findOne({ where: { city: 'Noida' } });
  }
  
  if (!hotel) {
    console.log('No hotel found in Noida (NCR) or Noida');
    await app.close();
    return;
  }

  const email = 'noida@hotel.com';
  const password = 'password123';
  const passwordHash = await bcrypt.hash(password, 10);

  const existing = await staffRepo.findOne({ where: { email } });
  if (existing) {
    console.log('Login already exists:');
    console.log('Email:', email);
    console.log('Password:', password);
  } else {
    const staff = staffRepo.create({
      name: 'Noida Hotel Owner',
      email: email,
      passwordHash: passwordHash,
      role: StaffRole.OWNER,
      hotelId: hotel.id,
    });
    await staffRepo.save(staff);
    console.log('Hotel login created:');
    console.log('Email:', email);
    console.log('Password:', password);
  }

  await app.close();
  process.exit(0);
}

bootstrap();
