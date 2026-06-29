"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const hotelRepo = app.get('HotelRepository');
    const staffRepo = app.get('StaffRepository');
    const roomRepo = app.get('RoomRepository');
    const hotels = await hotelRepo.find({
        relations: ['roomTypes'],
    });
    const hotelStats = [];
    for (const hotel of hotels) {
        const staff = await staffRepo.find({ where: { hotelId: hotel.id } });
        const roomTypeIds = hotel.roomTypes?.map((rt) => rt.id) || [];
        let rooms = [];
        if (roomTypeIds.length > 0) {
            rooms = await roomRepo.find({
                where: roomTypeIds.map(id => ({ roomTypeId: id })),
            });
        }
        hotelStats.push({
            hotelName: hotel.name,
            city: hotel.city,
            staffEmails: staff.map(s => s.email).filter(e => e),
            roomTypesCount: hotel.roomTypes?.length || 0,
            totalRoomsCount: rooms.length,
            hasData: (hotel.roomTypes?.length > 0 || rooms.length > 0) ? true : false,
        });
    }
    hotelStats.sort((a, b) => b.totalRoomsCount - a.totalRoomsCount || b.roomTypesCount - a.roomTypesCount);
    console.log('--- HOTELS WITH DATA FOR DEMO ---');
    for (const stat of hotelStats) {
        if (stat.hasData || stat.staffEmails.length > 0) {
            console.log(`\n🏨 Hotel: ${stat.hotelName} (${stat.city})`);
            console.log(`   - Login Emails: ${stat.staffEmails.length > 0 ? stat.staffEmails.join(', ') : 'None'}`);
            console.log(`   - Room Categories: ${stat.roomTypesCount}`);
            console.log(`   - Total Physical Rooms: ${stat.totalRoomsCount}`);
        }
    }
    await app.close();
}
bootstrap();
//# sourceMappingURL=list-demo-hotels.js.map