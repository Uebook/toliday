import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';
import { Booking } from './booking/entities/booking.entity';

dotenv.config();

const HOTEL_ID = 'a14099ec-86f1-414c-9d7b-ef699e4866b1';

async function checkBookings() {
  const connection = await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    ssl: { rejectUnauthorized: false },
    synchronize: false,
  });

  const bookingRepo = connection.getRepository(Booking);
  const bookings = await bookingRepo.find({
    where: { hotelId: HOTEL_ID }
  });

  console.log('📋 Bookings for hotel in DB:');
  console.table(bookings);

  await connection.close();
}

checkBookings().catch(console.error);
