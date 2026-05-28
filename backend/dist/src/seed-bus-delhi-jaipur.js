"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const bus_vendor_entity_1 = require("./buses/entities/bus-vendor.entity");
const bus_entity_1 = require("./buses/entities/bus.entity");
const bus_schedule_entity_1 = require("./buses/entities/bus-schedule.entity");
const seat_layout_entity_1 = require("./buses/entities/seat-layout.entity");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const busVendorRepo = app.get('BusVendorRepository');
    const busRepo = app.get('BusRepository');
    const routeRepo = app.get('BusRouteRepository');
    const scheduleRepo = app.get('BusScheduleRepository');
    const seatLayoutRepo = app.get('SeatLayoutRepository');
    console.log('Seeding Bus Data: New Delhi -> Jaipur');
    const vendor = await busVendorRepo.save(busVendorRepo.create({
        name: 'Delhi-Jaipur Express Manager',
        businessName: 'DJ Express Travels',
        email: 'djexpress@example.com',
        status: bus_vendor_entity_1.BusVendorStatus.APPROVED,
        isVerified: true,
        contactNumber: '9988776655',
    }));
    console.log('Created Vendor');
    const bus = await busRepo.save(busRepo.create({
        registrationNumber: 'DL 01 AB 1234',
        type: bus_entity_1.BusType.AC_SEATER,
        totalSeats: 40,
        vendorId: vendor.id,
    }));
    console.log('Created Bus');
    const seatLayouts = [];
    for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 4; col++) {
            const seatLetter = ['A', 'B', 'C', 'D'][col - 1];
            seatLayouts.push(seatLayoutRepo.create({
                busId: bus.id,
                deck: seat_layout_entity_1.DeckType.LOWER,
                row,
                column: col,
                seatType: seat_layout_entity_1.SeatType.SEATER,
                seatName: `${row}${seatLetter}`,
            }));
        }
    }
    await seatLayoutRepo.save(seatLayouts);
    console.log('Created Seat Layouts');
    const route = await routeRepo.save(routeRepo.create({
        originCity: 'New Delhi',
        destinationCity: 'Jaipur',
        distanceKm: 280,
        estimatedDuration: '05:30',
        boardingPoints: [
            { time: '08:00', location: 'Kashmere Gate ISBT' },
            { time: '08:30', location: 'Dhaula Kuan' },
        ],
        droppingPoints: [
            { time: '13:30', location: 'Sindhi Camp' },
            { time: '14:00', location: 'Narayan Singh Circle' },
        ],
    }));
    console.log('Created Route');
    const schedules = [];
    const today = new Date();
    for (let i = 0; i < 15; i++) {
        const departureDate = new Date(today);
        departureDate.setDate(departureDate.getDate() + i);
        const dateStr = departureDate.toISOString().split('T')[0];
        schedules.push(scheduleRepo.create({
            departureDate: dateStr,
            departureTime: '08:00:00',
            arrivalTime: '13:30:00',
            baseFare: 850.00,
            busId: bus.id,
            routeId: route.id,
            status: bus_schedule_entity_1.ScheduleStatus.SCHEDULED,
            seatsBooked: 0,
            isActive: true,
        }));
    }
    await scheduleRepo.save(schedules);
    console.log('Created 15 Schedules');
    console.log('Bus data seeding completed successfully!');
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed-bus-delhi-jaipur.js.map