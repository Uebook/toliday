import { Bus } from './bus.entity';
import { BusRoute } from './bus-route.entity';
import { Crew } from './crew.entity';
import { BusBooking } from './bus-booking.entity';
export declare enum ScheduleStatus {
    SCHEDULED = "SCHEDULED",
    IN_TRANSIT = "IN_TRANSIT",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare class BusSchedule {
    id: string;
    departureDate: string;
    departureTime: string;
    arrivalTime: string;
    baseFare: number;
    busId: string;
    bus: Bus;
    routeId: string;
    route: BusRoute;
    driverId: string;
    driver: Crew;
    conductorId: string;
    conductor: Crew;
    status: ScheduleStatus;
    weekendSurge: number;
    lastMinuteDiscount: number;
    bookings: BusBooking[];
    seatsBooked: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
