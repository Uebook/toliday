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
const bcrypt = __importStar(require("bcrypt"));
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("fs"));
const hotel_entity_1 = require("./src/hotel/entities/hotel.entity");
const room_type_entity_1 = require("./src/room-type/entities/room-type.entity");
const rate_plan_entity_1 = require("./src/hotel/entities/rate-plan.entity");
const staff_entity_1 = require("./src/staff/entities/staff.entity");
dotenv.config();
const hotelImages = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=800&q=80'
];
const roomImages = [
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80'
];
const hotelNames = [
    'The Grand Noida Resort & Spa',
    'Noida City Center Business Hotel',
    'Radisson Blu Plaza Sector 62',
    'Sandwood Boutique Hotel Noida',
    'Ginger Smart Hotel Sector 18',
    'Fortune Inn Corporate Noida',
    'Hyatt Regency Executive Noida',
    'The Noida Manor Guest House',
    'Mosaic Premium Hotel Noida',
    'Savoy Luxury Suites Noida'
];
const sectors = ['Sector 62', 'Sector 18', 'Sector 15', 'Sector 50', 'Sector 75', 'Sector 135', 'Sector 93', 'Sector 44', 'Sector 63', 'Sector 127'];
async function seed() {
    console.log('Connecting to database...');
    const caPath = process.env.DB_SSL_CA_PATH;
    let ca;
    if (caPath) {
        try {
            ca = fs.readFileSync(caPath).toString();
            console.log('Successfully read SSL CA certificate for seed');
        }
        catch (error) {
            console.error(`Failed to read SSL CA certificate at ${caPath}:`, error.message);
        }
    }
    const connection = await (0, typeorm_1.createConnection)({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
        ssl: ca ? {
            rejectUnauthorized: true,
            ca,
        } : {
            rejectUnauthorized: false,
        },
        synchronize: false,
    });
    const hotelRepository = connection.getRepository(hotel_entity_1.Hotel);
    const roomTypeRepository = connection.getRepository(room_type_entity_1.RoomType);
    const ratePlanRepository = connection.getRepository(rate_plan_entity_1.RatePlan);
    const staffRepository = connection.getRepository(staff_entity_1.Staff);
    const passwordHash = await bcrypt.hash('noida123', 10);
    console.log('Inserting Noida Hotels...');
    for (let i = 0; i < 10; i++) {
        const email = `noidahotel${i + 1}@toliday.in`;
        const existingStaff = await staffRepository.findOne({ where: { email } });
        if (existingStaff) {
            await staffRepository.delete(existingStaff.id);
        }
        const existingHotel = await hotelRepository.findOne({ where: { email } });
        if (existingHotel) {
            await hotelRepository.delete(existingHotel.id);
        }
        const name = hotelNames[i];
        const sector = sectors[i];
        const hotel = hotelRepository.create({
            name,
            description: `${name} offers premium accommodations in Noida with top-tier services, luxury room selections, dining facilities, and dynamic accessibility to the business parks.`,
            address: `Plot No. ${10 + i * 5}, Road B, ${sector}`,
            city: 'Noida',
            pinCode: `20130${i + 1}`,
            contactNumber: `98765432${10 + i}`,
            email,
            stars: i % 3 === 0 ? 5 : i % 2 === 0 ? 4 : 3,
            checkInTime: '14:00',
            checkOutTime: '11:00',
            maxAdults: '4',
            maxChildren: '2',
            amenities: ['wifi', 'ac', 'parking', 'restaurant', 'pool', 'gym', 'room_service'],
            images: [
                hotelImages[i % hotelImages.length],
                hotelImages[(i + 1) % hotelImages.length],
                hotelImages[(i + 2) % hotelImages.length]
            ],
            ownerFirstName: 'Noida',
            ownerLastName: `Owner ${i + 1}`,
            isVerified: true,
            status: hotel_entity_1.HotelStatus.APPROVED,
        });
        const savedHotel = await hotelRepository.save(hotel);
        console.log(`Saved Hotel: ${savedHotel.name} (ID: ${savedHotel.id})`);
        const staff = staffRepository.create({
            name: `Owner ${i + 1}`,
            email,
            passwordHash,
            role: staff_entity_1.StaffRole.OWNER,
            hotelId: savedHotel.id,
        });
        await staffRepository.save(staff);
        const roomCategories = [
            {
                name: 'Standard Room',
                price: 3500 + i * 200,
                capacity: 2,
                size: '280',
                totalRooms: 15,
                images: [roomImages[i % roomImages.length], roomImages[(i + 1) % roomImages.length]],
                amenities: ['wifi', 'ac', 'tv', 'desk', 'toiletries']
            },
            {
                name: 'Deluxe Suite',
                price: 5500 + i * 300,
                capacity: 3,
                size: '380',
                totalRooms: 10,
                images: [roomImages[(i + 2) % roomImages.length], roomImages[(i + 3) % roomImages.length]],
                amenities: ['wifi', 'ac', 'tv', 'desk', 'toiletries', 'sofa', 'minibar']
            },
            {
                name: 'Presidential Penthouse',
                price: 12000 + i * 500,
                capacity: 4,
                size: '600',
                totalRooms: 3,
                images: [roomImages[(i + 4) % roomImages.length], roomImages[(i + 5) % roomImages.length]],
                amenities: ['wifi', 'ac', 'tv', 'desk', 'toiletries', 'sofa', 'minibar', 'tub', 'balcony']
            }
        ];
        for (const roomData of roomCategories) {
            const roomType = roomTypeRepository.create({
                name: roomData.name,
                description: `Luxurious and spacious ${roomData.name} designed to deliver extreme comfort and modern efficiency. Includes all premium essentials.`,
                price: roomData.price,
                capacity: roomData.capacity,
                size: roomData.size,
                totalRooms: roomData.totalRooms,
                images: roomData.images,
                amenities: roomData.amenities,
                hotelId: savedHotel.id,
            });
            const savedRoomType = await roomTypeRepository.save(roomType);
            const epPlan = ratePlanRepository.create({
                name: 'Room Only (EP)',
                mealPlan: rate_plan_entity_1.MealPlan.EP,
                markupAmount: 0,
                markupPercentage: 0,
                isRefundable: true,
                cancellationPolicy: 'Free cancellation up to 24 hours prior to arrival.',
                inclusions: ['Room Stay', 'Free WiFi'],
                roomTypeId: savedRoomType.id,
                isActive: true
            });
            await ratePlanRepository.save(epPlan);
            const cpPlan = ratePlanRepository.create({
                name: 'Breakfast Plan (CP)',
                mealPlan: rate_plan_entity_1.MealPlan.CP,
                markupAmount: 600,
                markupPercentage: 0,
                isRefundable: true,
                cancellationPolicy: 'Free cancellation up to 24 hours prior to arrival.',
                inclusions: ['Room Stay', 'Free Breakfast', 'Free WiFi'],
                roomTypeId: savedRoomType.id,
                isActive: true
            });
            await ratePlanRepository.save(cpPlan);
            const mapPlan = ratePlanRepository.create({
                name: 'Half Board (MAP)',
                mealPlan: rate_plan_entity_1.MealPlan.MAP,
                markupAmount: 1800,
                markupPercentage: 0,
                isRefundable: false,
                cancellationPolicy: 'Non-refundable rate plan. Modifications allowed up to 48 hours prior.',
                inclusions: ['Room Stay', 'Free Breakfast', 'Free Dinner', 'Free WiFi'],
                roomTypeId: savedRoomType.id,
                isActive: true
            });
            await ratePlanRepository.save(mapPlan);
        }
    }
    await connection.close();
    console.log('Database Seeding Complete!');
    console.log('--- CREDENTIALS ---');
    for (let i = 0; i < 10; i++) {
        console.log(`Hotel: ${hotelNames[i]}`);
        console.log(`Email: noidahotel${i + 1}@toliday.in`);
        console.log(`Password: noida123`);
        console.log('-------------------');
    }
}
seed().catch(console.error);
//# sourceMappingURL=seed-noida-hotels.js.map