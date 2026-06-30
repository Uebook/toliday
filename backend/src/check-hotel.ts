import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';
import { Hotel } from './hotel/entities/hotel.entity';

dotenv.config();

const HOTEL_ID = 'a14099ec-86f1-414c-9d7b-ef699e4866b1';

async function check() {
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

  const hotelRepo = connection.getRepository(Hotel);
  const hotel = await hotelRepo.findOne({ where: { id: HOTEL_ID } });

  if (hotel) {
    console.log('🏨 Found Hotel:');
    console.log(JSON.stringify(hotel, null, 2));
  } else {
    console.log('❌ Hotel not found!');
  }

  await connection.close();
}

check().catch(console.error);
