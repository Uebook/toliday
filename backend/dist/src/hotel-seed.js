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
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const typeorm_1 = require("@nestjs/typeorm");
const hotel_entity_1 = require("./hotel/entities/hotel.entity");
const staff_entity_1 = require("./staff/entities/staff.entity");
const room_type_entity_1 = require("./room-type/entities/room-type.entity");
const booking_entity_1 = require("./booking/entities/booking.entity");
const global_inventory_entity_1 = require("./global-inventory/entities/global-inventory.entity");
const review_entity_1 = require("./reviews/entities/review.entity");
const ledger_entry_entity_1 = require("./finance/entities/ledger-entry.entity");
const bcrypt = __importStar(require("bcrypt"));
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const hotelRepo = app.get((0, typeorm_1.getRepositoryToken)(hotel_entity_1.Hotel));
    const staffRepo = app.get((0, typeorm_1.getRepositoryToken)(staff_entity_1.Staff));
    const roomTypeRepo = app.get((0, typeorm_1.getRepositoryToken)(room_type_entity_1.RoomType));
    const bookingRepo = app.get((0, typeorm_1.getRepositoryToken)(booking_entity_1.Booking));
    const invRepo = app.get((0, typeorm_1.getRepositoryToken)(global_inventory_entity_1.GlobalInventory));
    const reviewRepo = app.get((0, typeorm_1.getRepositoryToken)(review_entity_1.Review));
    const ledgerRepo = app.get((0, typeorm_1.getRepositoryToken)(ledger_entry_entity_1.LedgerEntry));
    console.log('--- DB SEEDING STARTED ---');
    console.log('Wiping existing hotel test data...');
    const wipe = async (query) => { try {
        await ledgerRepo.query(query);
    }
    catch (e) { } };
    await wipe('DELETE FROM ledger_entries;');
    await wipe('DELETE FROM global_reviews;');
    await wipe('DELETE FROM global_inventories;');
    await wipe('DELETE FROM bookings;');
    await wipe('DELETE FROM room_types;');
    await wipe('DELETE FROM staffs WHERE email = \'admin@toliday.com\' OR email = \'manager@hyattmumbai.com\';');
    await wipe('DELETE FROM hotels WHERE email = \'contact@hyattmumbai.com\';');
    console.log('Creating Hotel...');
    const hotelPayload = {
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
    console.log('Creating Staff (Admin & Vendor)...');
    const passwordHash = await bcrypt.hash('password123', 10);
    await staffRepo.save({
        name: 'Super Admin',
        email: 'admin@toliday.com',
        passwordHash,
        role: staff_entity_1.StaffRole.OWNER,
        isActive: true,
    });
    await staffRepo.save({
        name: 'Hotel Manager',
        email: 'manager@hyattmumbai.com',
        passwordHash,
        role: staff_entity_1.StaffRole.ADMIN,
        hotelId: hotel.id,
        isActive: true,
    });
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
    });
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
    });
    console.log('Creating Global Inventory matrix records...');
    for (let i = 0; i < 5; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        const dateStr = d.toISOString().split('T')[0];
        await invRepo.save({
            vendorId: hotel.id,
            vertical: global_inventory_entity_1.VerticalType.HOTEL,
            resourceId: room1.id,
            resourceName: room1.name,
            date: dateStr,
            totalUnits: 15,
            availableUnits: 15 - (i % 3),
            basePrice: room1.price,
        });
        await invRepo.save({
            vendorId: hotel.id,
            vertical: global_inventory_entity_1.VerticalType.HOTEL,
            resourceId: room2.id,
            resourceName: room2.name,
            date: dateStr,
            totalUnits: 5,
            availableUnits: 5 - (i % 2),
            basePrice: room2.price,
        });
    }
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
        status: booking_entity_1.BookingStatus.CONFIRMED,
        hotelId: hotel.id,
        hotel: hotel,
        roomTypeId: room1.id,
        roomType: room1,
        isSettled: false,
        commissionAmount: 2400,
        netAmount: 21600,
    });
    const b2 = await bookingRepo.save({
        guestName: 'Jane Smith',
        guestEmail: 'jane@example.com',
        guestContact: '+0987654321',
        startDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        endDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
        numberOfGuests: 4,
        totalAmount: 75000,
        bookingReference: 'TOL-HOT-1002',
        status: booking_entity_1.BookingStatus.PENDING,
        hotelId: hotel.id,
        hotel: hotel,
        roomTypeId: room2.id,
        roomType: room2,
        isSettled: false,
        commissionAmount: 7500,
        netAmount: 67500,
    });
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
    });
    console.log('Creating Ledger Entries...');
    await ledgerRepo.save({
        vendorId: hotel.id,
        vendorName: hotel.name,
        vertical: ledger_entry_entity_1.VerticalType.HOTEL,
        bookingReference: b1.bookingReference,
        amount: b1.netAmount,
        type: ledger_entry_entity_1.LedgerEntryType.CREDIT,
        description: 'Booking settlement',
        date: new Date(),
    });
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
//# sourceMappingURL=hotel-seed.js.map