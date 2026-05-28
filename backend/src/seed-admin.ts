import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Repository } from 'typeorm';
import { Staff, StaffRole } from './staff/entities/staff.entity';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const staffRepository = app.get('StaffRepository');

  const adminEmail = 'admin@toliday.com';
  const adminPassword = 'adminpassword123';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const existing = await staffRepository.findOne({
    where: { email: adminEmail },
  });
  if (existing) {
    console.log('Admin already exists');
  } else {
    const admin = staffRepository.create({
      name: 'Global Admin',
      email: adminEmail,
      passwordHash: passwordHash,
      role: StaffRole.ADMIN,
    });
    await staffRepository.save(admin);
    console.log('Admin created:');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
  }

  await app.close();
}
bootstrap();
