"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
const room_type_entity_1 = require("./room-type/entities/room-type.entity");
const inventory_entity_1 = require("./inventory/entities/inventory.entity");
dotenv.config();
const HOTEL_ID = 'a14099ec-86f1-414c-9d7b-ef699e4866b1';
async function seedInventory() {
    console.log('🚀 Connecting to database...');
    const connection = await (0, typeorm_1.createConnection)({
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
    const roomTypeRepo = connection.getRepository(room_type_entity_1.RoomType);
    const inventoryRepo = connection.getRepository(inventory_entity_1.Inventory);
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
        const recordsToSave = [];
        console.log(`  ➡️ Processing Room Type: ${rt.name} (Total Capacity: ${totalRooms} rooms)`);
        for (let i = 0; i < 90; i++) {
            const dt = new Date(startDate);
            dt.setDate(dt.getDate() + i);
            const dateStr = dt.toISOString().split('T')[0];
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
        }
        else {
            console.log(`     ℹ️ Inventory already up to date.`);
        }
    }
    console.log('\n🎉 Inventory seeding complete!');
    await connection.close();
}
seedInventory().catch(console.error);
//# sourceMappingURL=seed-inventory.js.map