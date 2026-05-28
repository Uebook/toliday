import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getSummary(req: any): Promise<{
        revenue: number;
        checkInsToday: number;
        checkOutsToday: number;
        pendingBookings: number;
        cancellations: number;
        activeStay: number;
        totalBookings: number;
        revenueTrend: {
            day: string;
            revenue: number;
        }[];
        recentBookings: {
            ref: string;
            guest: string;
            room: string;
            checkIn: string;
            status: import("../booking/entities/booking.entity").BookingStatus;
            amount: string;
        }[];
    }>;
    getReports(req: any, period?: '7d' | '30d' | '90d'): Promise<{
        dailyData: {
            date: string;
            revenue: number;
            bookings: number;
            cancellations: number;
            occupancy: number;
        }[];
        totalRevenue: number;
        totalBookings: number;
        totalCancellations: number;
        avgOccupancy: number;
        sourceData: {
            name: string;
            value: number;
        }[];
    }>;
}
