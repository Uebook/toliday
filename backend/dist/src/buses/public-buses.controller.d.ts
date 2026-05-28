import { BusesService } from './buses.service';
export declare class PublicBusesController {
    private readonly busesService;
    constructor(busesService: BusesService);
    searchBuses(origin: string, destination: string, date: string): Promise<import("./entities/bus-schedule.entity").BusSchedule[]>;
    getSeatMatrix(scheduleId: string): Promise<{
        layout: import("./entities/seat-layout.entity").SeatLayout[];
        lockedSeats: string[];
        schedule: import("./entities/bus-schedule.entity").BusSchedule;
    }>;
    lockSeats(data: any): Promise<import("./entities/bus-booking.entity").BusBooking[]>;
}
