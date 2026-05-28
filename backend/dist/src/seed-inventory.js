"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const inventory_service_1 = require("./inventory/inventory.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const roomTypeRepo = app.get('RoomTypeRepository');
    const inventoryService = app.get(inventory_service_1.InventoryService);
    console.log('Fetching all room types...');
    const rooms = await roomTypeRepo.find();
    if (rooms.length === 0) {
        console.log('No rooms found. Run seed-data.ts first.');
        await app.close();
        return;
    }
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 60);
    const startStr = startDate.toISOString().split('T')[0];
    const endStr = endDate.toISOString().split('T')[0];
    console.log(`Seeding inventory from ${startStr} to ${endStr}...`);
    for (const room of rooms) {
        console.log(`Setting inventory for room ${room.id} (Hotel: ${room.hotelId})...`);
        await inventoryService.bulkUpdate(room.hotelId, {
            roomTypeId: room.id,
            startDate: startStr,
            endDate: endStr,
            totalRooms: 10,
        });
    }
    console.log('Inventory seeding completed successfully!');
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed-inventory.js.map