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
const room_type_entity_1 = require("./src/room-type/entities/room-type.entity");
const rate_plan_entity_1 = require("./src/hotel/entities/rate-plan.entity");
dotenv.config();
const HOTEL_ID = 'a14099ec-86f1-414c-9d7b-ef699e4866b1';
const roomCategories = [
    {
        name: 'Classic Room',
        description: 'A comfortable and elegantly appointed room with modern amenities, perfect for solo travelers and couples seeking a relaxed stay.',
        price: 2499,
        capacity: 2,
        extraPersonPrice: 800,
        size: '220',
        totalRooms: 15,
        amenities: ['Free Wi-Fi', 'Air Conditioning', 'Flat-screen TV', 'Mini-bar', 'Work Desk', 'Safe', 'Ensuite Bathroom', 'Tea/Coffee Maker'],
        images: [
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
        ],
        ratePlans: [
            {
                name: 'Room Only – Free Cancellation',
                mealPlan: rate_plan_entity_1.MealPlan.EP,
                markupAmount: 0,
                isRefundable: true,
                cancellationPolicy: 'till 24 hrs before check-in',
                inclusions: ['Free cancellation', 'No meals included', 'Complimentary Wi-Fi'],
            },
            {
                name: 'Breakfast Included – Free Cancellation',
                mealPlan: rate_plan_entity_1.MealPlan.CP,
                markupAmount: 500,
                isRefundable: true,
                cancellationPolicy: 'till 24 hrs before check-in',
                inclusions: ['Buffet breakfast for 2', 'Complimentary Wi-Fi', 'Late checkout till 1 PM'],
            },
            {
                name: 'Non-Refundable Deal – Breakfast',
                mealPlan: rate_plan_entity_1.MealPlan.CP,
                markupAmount: 200,
                isRefundable: false,
                cancellationPolicy: '',
                inclusions: ['Buffet breakfast for 2', 'Complimentary Wi-Fi', 'Best price guarantee'],
            },
        ],
    },
    {
        name: 'Deluxe Room',
        description: 'Spacious and stylishly furnished Deluxe Rooms with upgraded amenities including a seating area and premium toiletries.',
        price: 3499,
        capacity: 2,
        extraPersonPrice: 1000,
        size: '300',
        totalRooms: 12,
        amenities: ['Free Wi-Fi', 'Air Conditioning', '55" Flat-screen TV', 'Mini-bar', 'Seating Area', 'Safe', 'Ensuite Bathroom', 'Tea/Coffee Maker', 'Bathtub'],
        images: [
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
        ],
        ratePlans: [
            {
                name: 'Room Only – Free Cancellation',
                mealPlan: rate_plan_entity_1.MealPlan.EP,
                markupAmount: 0,
                isRefundable: true,
                cancellationPolicy: 'till 24 hrs before check-in',
                inclusions: ['Free cancellation', 'Complimentary Wi-Fi', 'Complimentary newspaper'],
            },
            {
                name: 'Super Package – Breakfast + Lunch/Dinner',
                mealPlan: rate_plan_entity_1.MealPlan.MAP,
                markupAmount: 1200,
                isRefundable: true,
                cancellationPolicy: 'till 48 hrs before check-in',
                inclusions: ['Breakfast + Lunch or Dinner', 'Enjoy Happy Hours with 1+1 offer', '20% off on F&B', 'Complimentary Wi-Fi'],
            },
            {
                name: 'Non-Refundable – Half Board Deal',
                mealPlan: rate_plan_entity_1.MealPlan.MAP,
                markupAmount: 900,
                isRefundable: false,
                cancellationPolicy: '',
                inclusions: ['Breakfast + Lunch or Dinner', 'Best price guarantee', 'Complimentary Wi-Fi'],
            },
        ],
    },
    {
        name: 'Premium Room',
        description: 'Premium Rooms offer a luxurious retreat with a king-size bed, city views, and dedicated concierge service.',
        price: 5499,
        capacity: 2,
        extraPersonPrice: 1500,
        size: '380',
        totalRooms: 8,
        amenities: ['Free Wi-Fi', 'Air Conditioning', '65" Smart TV', 'Mini-bar', 'Seating Area', 'In-room Safe', 'Jacuzzi', 'Tea/Coffee Maker', 'Balcony', 'City View', 'Premium Toiletries'],
        images: [
            'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
        ],
        ratePlans: [
            {
                name: 'Room Only – Free Cancellation',
                mealPlan: rate_plan_entity_1.MealPlan.EP,
                markupAmount: 0,
                isRefundable: true,
                cancellationPolicy: 'till 24 hrs before check-in',
                inclusions: ['Free cancellation', 'Complimentary Wi-Fi', 'Complimentary airport pickup (1 way)'],
            },
            {
                name: 'Breakfast Included – Flexible',
                mealPlan: rate_plan_entity_1.MealPlan.CP,
                markupAmount: 700,
                isRefundable: true,
                cancellationPolicy: 'till 24 hrs before check-in',
                inclusions: ['Breakfast for 2', 'Evening tea & snacks', 'Complimentary Wi-Fi', 'Early check-in (subject to availability)'],
            },
            {
                name: 'Super Package – All Inclusive',
                mealPlan: rate_plan_entity_1.MealPlan.AP,
                markupAmount: 2500,
                isRefundable: true,
                cancellationPolicy: 'till 48 hrs before check-in',
                inclusions: ['All meals included', 'Enjoy Happy Hours with 1+1 offer', '20% off on Spa', 'Complimentary Wi-Fi', 'Complimentary airport transfer'],
            },
            {
                name: 'Non-Refundable – All Inclusive',
                mealPlan: rate_plan_entity_1.MealPlan.AP,
                markupAmount: 1800,
                isRefundable: false,
                cancellationPolicy: '',
                inclusions: ['All meals included', 'Best price guarantee', 'Complimentary Wi-Fi'],
            },
        ],
    },
    {
        name: 'Suite',
        description: 'Our opulent Suites feature a separate living room, plush king-size bed, panoramic city views, and dedicated butler service for the ultimate luxury experience.',
        price: 9999,
        capacity: 3,
        extraPersonPrice: 2000,
        size: '600',
        totalRooms: 4,
        amenities: ['Free Wi-Fi', 'Air Conditioning', '75" Smart TV', 'Full Mini-bar', 'Separate Living Area', 'Walk-in Closet', 'Jacuzzi', 'Rain Shower', 'Butler Service', 'Balcony', 'Panoramic View', 'Premium Toiletries', 'Nespresso Machine'],
        images: [
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1587985064135-0366536eab42?auto=format&fit=crop&w=1200&q=80',
        ],
        ratePlans: [
            {
                name: 'Suite – Free Cancellation',
                mealPlan: rate_plan_entity_1.MealPlan.EP,
                markupAmount: 0,
                isRefundable: true,
                cancellationPolicy: 'till 48 hrs before check-in',
                inclusions: ['Free cancellation', 'Complimentary Wi-Fi', 'Welcome fruit basket', 'Complimentary airport transfer'],
            },
            {
                name: 'Suite + Breakfast – Free Cancellation',
                mealPlan: rate_plan_entity_1.MealPlan.CP,
                markupAmount: 1000,
                isRefundable: true,
                cancellationPolicy: 'till 48 hrs before check-in',
                inclusions: ['Breakfast for 3', 'Complimentary Wi-Fi', 'Welcome fruit basket & wine', 'Complimentary airport transfer'],
            },
            {
                name: 'Super Package Suite – Full Board',
                mealPlan: rate_plan_entity_1.MealPlan.AP,
                markupAmount: 4000,
                isRefundable: true,
                cancellationPolicy: 'till 72 hrs before check-in',
                inclusions: ['All meals for 3', 'Enjoy Happy Hours with 1+1 offer', '30% off on Spa', 'Complimentary Wi-Fi', 'Round-trip airport transfer', 'Daily evening turndown service'],
            },
        ],
    },
    {
        name: 'Family Room',
        description: 'Designed for families, these spacious rooms feature two queen beds or a king + bunk beds, a kitchenette, and a play corner for younger guests.',
        price: 4999,
        capacity: 4,
        extraPersonPrice: 1200,
        size: '480',
        totalRooms: 6,
        amenities: ['Free Wi-Fi', 'Air Conditioning', '55" Smart TV', 'Kitchenette', 'Two Bathrooms', 'Safe', 'Seating Area', 'Kids Play Corner', 'Extra Beds Available', 'Blackout Curtains'],
        images: [
            'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80',
        ],
        ratePlans: [
            {
                name: 'Family Room – Free Cancellation',
                mealPlan: rate_plan_entity_1.MealPlan.EP,
                markupAmount: 0,
                isRefundable: true,
                cancellationPolicy: 'till 24 hrs before check-in',
                inclusions: ['Free cancellation', 'Complimentary Wi-Fi', 'Kids under 5 stay free', 'Complimentary board games'],
            },
            {
                name: 'Family Breakfast Package',
                mealPlan: rate_plan_entity_1.MealPlan.CP,
                markupAmount: 1200,
                isRefundable: true,
                cancellationPolicy: 'till 24 hrs before check-in',
                inclusions: ['Breakfast for the whole family', 'Kids eat free (under 10)', 'Complimentary Wi-Fi', 'Late checkout till 1 PM'],
            },
            {
                name: 'Super Package – Family All Inclusive',
                mealPlan: rate_plan_entity_1.MealPlan.AP,
                markupAmount: 3500,
                isRefundable: true,
                cancellationPolicy: 'till 48 hrs before check-in',
                inclusions: ['All meals for the whole family', 'Kids eat free (under 12)', 'Enjoy Happy Hours', '20% off on indoor activities', 'Complimentary Wi-Fi'],
            },
            {
                name: 'Non-Refundable Family Deal – Breakfast',
                mealPlan: rate_plan_entity_1.MealPlan.CP,
                markupAmount: 800,
                isRefundable: false,
                cancellationPolicy: '',
                inclusions: ['Breakfast for the whole family', 'Kids eat free (under 10)', 'Best price guarantee'],
            },
        ],
    },
];
async function seed() {
    console.log('🚀 Connecting to database...');
    const connection = await (0, typeorm_1.createConnection)({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
        ssl: {
            rejectUnauthorized: false,
        },
        synchronize: false,
    });
    const roomTypeRepo = connection.getRepository(room_type_entity_1.RoomType);
    const ratePlanRepo = connection.getRepository(rate_plan_entity_1.RatePlan);
    console.log(`\n🏨 Seeding rooms for Hotel ID: ${HOTEL_ID}\n`);
    for (const roomData of roomCategories) {
        const { ratePlans: ratePlanData, ...roomFields } = roomData;
        const roomType = roomTypeRepo.create({
            ...roomFields,
            hotelId: HOTEL_ID,
        });
        const savedRoom = await roomTypeRepo.save(roomType);
        console.log(`  ✅ Created Room: ${savedRoom.name} (ID: ${savedRoom.id})`);
        for (const planData of ratePlanData) {
            const plan = ratePlanRepo.create({
                ...planData,
                roomTypeId: savedRoom.id,
            });
            await ratePlanRepo.save(plan);
            console.log(`     📦 Package: ${planData.name}`);
        }
    }
    console.log('\n✨ All rooms and packages seeded successfully!');
    await connection.close();
}
seed().catch(err => {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
});
//# sourceMappingURL=seed-my-business-rooms.js.map