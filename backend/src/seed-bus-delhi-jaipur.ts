import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BusVendor, BusVendorStatus } from './buses/entities/bus-vendor.entity';
import { Bus, BusType } from './buses/entities/bus.entity';
import { BusRoute } from './buses/entities/bus-route.entity';
import { BusSchedule, ScheduleStatus } from './buses/entities/bus-schedule.entity';
import { SeatLayout, DeckType, SeatType } from './buses/entities/seat-layout.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const busVendorRepo = app.get('BusVendorRepository');
  const busRepo = app.get('BusRepository');
  const routeRepo = app.get('BusRouteRepository');
  const scheduleRepo = app.get('BusScheduleRepository');
  const seatLayoutRepo = app.get('SeatLayoutRepository');

  console.log('Seeding Bus Data: New Delhi -> Jaipur');

  // 1. Create a Vendor
  const vendor = await busVendorRepo.save(
    busVendorRepo.create({
      name: 'Delhi-Jaipur Express Manager',
      businessName: 'DJ Express Travels',
      email: 'djexpress@example.com',
      status: BusVendorStatus.APPROVED,
      isVerified: true,
      contactNumber: '9988776655',
    }),
  );
  console.log('Created Vendor');

  // 2. Create a Bus
  const bus = await busRepo.save(
    busRepo.create({
      registrationNumber: 'DL 01 AB 1234',
      type: BusType.AC_SEATER,
      totalSeats: 40,
      vendorId: vendor.id,
    }),
  );
  console.log('Created Bus');

  // 3. Create Seat Layout for the bus (40 seats, 10 rows, 4 columns)
  const seatLayouts: SeatLayout[] = [];
  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 4; col++) {
      const seatLetter = ['A', 'B', 'C', 'D'][col - 1];
      seatLayouts.push(
        seatLayoutRepo.create({
          busId: bus.id,
          deck: DeckType.LOWER,
          row,
          column: col,
          seatType: SeatType.SEATER,
          seatName: `${row}${seatLetter}`,
        }),
      );
    }
  }
  await seatLayoutRepo.save(seatLayouts);
  console.log('Created Seat Layouts');

  // 4. Create Route
  const route = await routeRepo.save(
    routeRepo.create({
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
    }),
  );
  console.log('Created Route');

  // 5. Create Schedules for the next 15 days
  const schedules: BusSchedule[] = [];
  const today = new Date();
  for (let i = 0; i < 15; i++) {
    const departureDate = new Date(today);
    departureDate.setDate(departureDate.getDate() + i);
    const dateStr = departureDate.toISOString().split('T')[0];

    schedules.push(
      scheduleRepo.create({
        departureDate: dateStr,
        departureTime: '08:00:00',
        arrivalTime: '13:30:00',
        baseFare: 850.00,
        busId: bus.id,
        routeId: route.id,
        status: ScheduleStatus.SCHEDULED,
        seatsBooked: 0,
        isActive: true,
      }),
    );
  }
  await scheduleRepo.save(schedules);
  console.log('Created 15 Schedules');

  console.log('Bus data seeding completed successfully!');
  await app.close();
}

bootstrap();
