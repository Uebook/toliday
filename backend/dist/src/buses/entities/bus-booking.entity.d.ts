import { BusSchedule } from './bus-schedule.entity';
export declare enum BookingStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
    FAILED = "FAILED"
}
export declare class BusBooking {
    id: string;
    pnr: string;
    scheduleId: string;
    schedule: BusSchedule;
    passengerDetails: any[];
    selectedSeats: string[];
    boardingPoint: string;
    boardingTime: string;
    droppingPoint: string;
    droppingTime: string;
    totalFare: number;
    status: BookingStatus;
    paymentId: string;
    isSettled: boolean;
    commissionAmount: number;
    netAmount: number;
    createdAt: Date;
    updatedAt: Date;
}
