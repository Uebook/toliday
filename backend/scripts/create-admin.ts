
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Staff, StaffRole } from '../src/staff/entities/staff.entity';
import { Hotel } from '../src/hotel/entities/hotel.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

async function bootstrap() {
       const app = await NestFactory.createApplicationContext(AppModule);
       const staffRepository = app.get<Repository<Staff>>(getRepositoryToken(Staff));
       const hotelRepository = app.get<Repository<Hotel>>(getRepositoryToken(Hotel));

       const email = 'admin@gmail.com';
       const password = '12345678';
       const name = 'System Admin';

       try {
              // Check if email already exists
              let staff = await staffRepository.findOne({ where: { email } });
              const passwordHash = await bcrypt.hash(password, 10);

              if (staff) {
                     console.log('Admin user exists. Updating password...');
                     staff.passwordHash = passwordHash;
              } else {
                     console.log('Creating new admin user...');
                     // Get any hotel to link to, or create a default one
                     let hotel = await hotelRepository.findOne({ where: {} });
                     if (!hotel) {
                            console.log('No hotels found. Creating a default Admin Hotel...');
                            hotel = hotelRepository.create({
                                   name: 'Admin Hotel',
                                   email: 'admin-hotel@gmail.com',
                                   isVerified: true,
                            });
                            hotel = await hotelRepository.save(hotel);
                     }

                     staff = staffRepository.create({
                            name,
                            email,
                            passwordHash,
                            role: StaffRole.ADMIN,
                            hotelId: hotel.id,
                            isActive: true,
                            permissions: {
                                   all: true,
                                   dashboard_view: true,
                                   notifications_view: true,
                                   property_view: true,
                                   property_edit: true,
                                   inventory_view: true,
                                   inventory_edit: true,
                                   rates_view: true,
                                   rates_edit: true,
                                   bookings_view: true,
                                   bookings_modify: true,
                                   staff_manage: true,
                                   payments_view: true,
                                   reports_view: true,
                                   profile_view: true,
                                   settings_edit: true,
                                   support_view: true,
                            }
                     });
              }

              await staffRepository.save(staff);
              console.log(`Admin user ${staff ? 'updated' : 'created'} successfully: ${email}`);
       } catch (error) {
              console.error('Error creating admin user:', error);
       } finally {
              await app.close();
       }
}

bootstrap();
