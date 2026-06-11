import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Hotel } from './hotel/entities/hotel.entity';
import { Staff, StaffRole } from './staff/entities/staff.entity';
import { RoomType } from './room-type/entities/room-type.entity';
import { Booking, BookingStatus } from './booking/entities/booking.entity';
import { GlobalInventory, VerticalType as GVerticalType } from './global-inventory/entities/global-inventory.entity';
import { Review } from './reviews/entities/review.entity';
import { LedgerEntry, VerticalType as LVerticalType, LedgerEntryType } from './finance/entities/ledger-entry.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const hotelRepo: Repository<Hotel> = app.get(getRepositoryToken(Hotel));
  const staffRepo: Repository<Staff> = app.get(getRepositoryToken(Staff));
  const roomTypeRepo: Repository<RoomType> = app.get(getRepositoryToken(RoomType));
  const bookingRepo: Repository<Booking> = app.get(getRepositoryToken(Booking));
  const invRepo: Repository<GlobalInventory> = app.get(getRepositoryToken(GlobalInventory));
  const reviewRepo: Repository<Review> = app.get(getRepositoryToken(Review));
  const ledgerRepo: Repository<LedgerEntry> = app.get(getRepositoryToken(LedgerEntry));

  console.log('--- DB SEEDING STARTED ---');

  // 1. Wipe existing test data
  console.log('Wiping existing hotel test data...');
  const wipe = async (query: string) => { try { await ledgerRepo.query(query); } catch(e) {} };
  await wipe('DELETE FROM ledger_entries;');
  await wipe('DELETE FROM global_reviews;');
  await wipe('DELETE FROM global_inventories;');
  await wipe('DELETE FROM bookings;');
  await wipe('DELETE FROM room_types;');
  await wipe('DELETE FROM staffs WHERE email = \'admin@toliday.com\' OR email = \'manager@hyattmumbai.com\';');
  await wipe('DELETE FROM hotels WHERE email = \'contact@hyattmumbai.com\';');

  // 2. Create Hotel
  console.log('Creating Hotel...');
  const hotelPayload: any = {
    name: 'Grand Hyatt Mumbai',
    description: 'A 5-star luxury resort spanning 12 acres.',
    address: 'Bandra Kurla Complex',
    city: 'Mumbai',
    pinCode: '400055',
    latitude: 19.0771,
    longitude: 72.8541,
    stars: 5,
    status: 'APPROVED',
    email: 'contact@hyattmumbai.com',
    contactNumber: '+919876543210',
    amenities: ['Pool', 'Spa', 'Gym', 'WiFi'],
    images: ['https://images.unsplash.com/photo-1542314831-c6a4d14d8374?auto=format&fit=crop&w=800'],
  };
  const hotel = await hotelRepo.save(hotelPayload);

  // 3. Create Admin & Vendor Staff
  console.log('Creating Staff (Admin & Vendor)...');
  const passwordHash = await bcrypt.hash('password123', 10);
  
  await staffRepo.save({
    name: 'Super Admin',
    email: 'admin@toliday.com',
    passwordHash,
    role: StaffRole.OWNER,
    isActive: true,
  } as any);

  await staffRepo.save({
    name: 'Hotel Manager',
    email: 'manager@hyattmumbai.com',
    passwordHash,
    role: StaffRole.ADMIN,
    hotelId: hotel.id,
    isActive: true,
  } as any);

  // 4. Create Room Types
  console.log('Creating Room Types...');
  const room1 = await roomTypeRepo.save({
    name: 'Deluxe Ocean View',
    description: 'Spacious room with ocean view.',
    price: 12000,
    capacity: 2,
    size: 45,
    hotel: hotel,
    amenities: ['Ocean View', 'King Bed'],
    images: [],
    totalRooms: 15,
  } as any);

  const room2 = await roomTypeRepo.save({
    name: 'Premium Suite',
    description: 'Luxury suite with living room.',
    price: 25000,
    capacity: 4,
    size: 85,
    hotel: hotel,
    amenities: ['Living Room', 'Bathtub'],
    images: [],
    totalRooms: 5,
  } as any);

  // 5. Create Global Inventory
  console.log('Creating Global Inventory matrix records...');
  for (let i = 0; i < 5; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];

    await invRepo.save({
      vendorId: hotel.id,
      vertical: GVerticalType.HOTEL,
      resourceId: room1.id,
      resourceName: room1.name,
      date: dateStr,
      totalUnits: 15,
      availableUnits: 15 - (i % 3),
      basePrice: room1.price,
    } as any);

    await invRepo.save({
      vendorId: hotel.id,
      vertical: GVerticalType.HOTEL,
      resourceId: room2.id,
      resourceName: room2.name,
      date: dateStr,
      totalUnits: 5,
      availableUnits: 5 - (i % 2),
      basePrice: room2.price,
    } as any);
  }

  // 6. Create Bookings
  console.log('Creating Bookings...');
  const b1 = await bookingRepo.save({
    guestName: 'John Doe',
    guestEmail: 'john@example.com',
    guestContact: '+1234567890',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    numberOfGuests: 2,
    totalAmount: 24000,
    bookingReference: 'TOL-HOT-1001',
    status: BookingStatus.CONFIRMED,
    hotelId: hotel.id,
    hotel: hotel,
    roomTypeId: room1.id,
    roomType: room1,
    isSettled: false,
    commissionAmount: 2400,
    netAmount: 21600,
  } as any);

  const b2 = await bookingRepo.save({
    guestName: 'Jane Smith',
    guestEmail: 'jane@example.com',
    guestContact: '+0987654321',
    startDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
    numberOfGuests: 4,
    totalAmount: 75000,
    bookingReference: 'TOL-HOT-1002',
    status: BookingStatus.PENDING,
    hotelId: hotel.id,
    hotel: hotel,
    roomTypeId: room2.id,
    roomType: room2,
    isSettled: false,
    commissionAmount: 7500,
    netAmount: 67500,
  } as any);

  // 7. Create Reviews
  console.log('Creating Reviews...');
  await reviewRepo.save({
    vendorId: hotel.id,
    vendorName: hotel.name,
    vertical: 'HOTEL',
    resourceId: room1.id,
    resourceName: 'Grand Hyatt Mumbai - Deluxe Ocean View',
    guestName: 'Alice Wonderland',
    rating: 5,
    comment: 'Absolutely stunning view and excellent service.',
    status: 'PUBLISHED',
  } as any);

  // 8. Create Ledger Entries
  console.log('Creating Ledger Entries...');
  await ledgerRepo.save({
    vendorId: hotel.id,
    vendorName: hotel.name,
    vertical: LVerticalType.HOTEL,
    bookingReference: b1.bookingReference,
    amount: b1.netAmount,
    type: LedgerEntryType.CREDIT,
    description: 'Booking settlement',
    date: new Date(),
  } as any);

  console.log('--- DB SEEDING COMPLETED SUCCESSFULLY ---');
  console.log('Admin Email: admin@toliday.com | Pass: password123');
  console.log('Vendor Email: manager@hyattmumbai.com | Pass: password123');
  console.log('Hotel ID:', hotel.id);
  console.log('RoomType1 ID:', room1.id);
  
  await app.close();
}

bootstrap().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
