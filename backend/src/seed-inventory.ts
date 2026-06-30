import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';
import { RoomType } from './room-type/entities/room-type.entity';
import { Inventory } from './inventory/entities/inventory.entity';

dotenv.config();

const HOTEL_ID = 'a14099ec-86f1-414c-9d7b-ef699e4866b1';

async function seedInventory() {
  console.log('🚀 Connecting to database...');
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

  const roomTypeRepo = connection.getRepository(RoomType);
  const inventoryRepo = connection.getRepository(Inventory);

  console.log(`🏨 Finding room types for Hotel ID: ${HOTEL_ID}`);
  const roomTypes = await roomTypeRepo.find({ where: { hotelId: HOTEL_ID } });

  if (roomTypes.length === 0) {
    console.log('❌ No room types found for this hotel. Run room seed first!');
    await connection.close();
    return;
  }

  console.log(`✨ Found ${roomTypes.length} room types. Generating 90 days of inventory...`);

  const startDate = new Date();
  
  for (const rt of roomTypes) {
    const totalRooms = rt.totalRooms || 10;
    const recordsToSave: Inventory[] = [];

    console.log(`  ➡️ Processing Room Type: ${rt.name} (Total Capacity: ${totalRooms} rooms)`);

    for (let i = 0; i < 90; i++) {
      const dt = new Date(startDate);
      dt.setDate(dt.getDate() + i);
      const dateStr = dt.toISOString().split('T')[0];

      // Check if inventory already exists
      let inv = await inventoryRepo.findOne({ where: { roomTypeId: rt.id, date: dateStr } });
      if (!inv) {
        inv = inventoryRepo.create({
          roomTypeId: rt.id,
          date: dateStr,
          totalRooms: totalRooms,
          availableRooms: totalRooms,
        });
        recordsToSave.push(inv);
      }
    }

    if (recordsToSave.length > 0) {
      await inventoryRepo.save(recordsToSave);
      console.log(`     ✅ Created ${recordsToSave.length} days of inventory.`);
    } else {
      console.log(`     ℹ️ Inventory already up to date.`);
    }
  }

  console.log('\n🎉 Inventory seeding complete!');
  await connection.close();
}

seedInventory().catch(console.error);
