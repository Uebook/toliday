import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bcrypt from 'bcrypt';
import { Staff } from './staff/entities/staff.entity';
import { Repository } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const staffRepo: Repository<Staff> = app.get('StaffRepository');

  const newPassword = 'noida123';
  const passwordHash = await bcrypt.hash(newPassword, 10);

  // Update all staff members that have a hotelId (i.e., all hotel staff)
  const hotelStaff = await staffRepo.createQueryBuilder('staff')
    .where('staff.hotelId IS NOT NULL')
    .getMany();

  console.log(`Found ${hotelStaff.length} hotel staff members to update.`);

  for (const staff of hotelStaff) {
    staff.passwordHash = passwordHash;
    await staffRepo.save(staff);
    console.log(`Updated password for: ${staff.email}`);
  }

  // Also specifically check if noidahotel1@toliday.in exists, if not maybe log it
  const specificUser = await staffRepo.findOne({ where: { email: 'noidahotel1@toliday.in' } });
  if (specificUser) {
    specificUser.passwordHash = passwordHash;
    await staffRepo.save(specificUser);
    console.log(`Specifically verified/updated password for: noidahotel1@toliday.in`);
  } else {
    console.log(`Note: User noidahotel1@toliday.in was NOT found in the database.`);
  }

  console.log('Finished updating passwords to: noida123');
  await app.close();
}

bootstrap();
