import { BusSchedule } from './bus-schedule.entity';
export declare class BusRoute {
    id: string;
    originCity: string;
    destinationCity: string;
    distanceKm: number;
    estimatedDuration: string;
    boardingPoints: any[];
    droppingPoints: any[];
    schedules: BusSchedule[];
    createdAt: Date;
    updatedAt: Date;
}
