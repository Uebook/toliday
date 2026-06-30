import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';
import { Hotel } from './hotel/entities/hotel.entity';

dotenv.config();

async function listAll() {
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
  const hotels = await hotelRepo.find({
    select: ['id', 'name', 'city', 'status', 'isVerified', 'createdAt']
  });

  console.log('📋 All Hotels in DB:');
  console.table(hotels);

  await connection.close();
}

listAll().catch(console.error);
