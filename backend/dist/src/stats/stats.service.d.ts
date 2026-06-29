import { Repository } from 'typeorm';
import { Booking, BookingStatus } from '../booking/entities/booking.entity';
import { RoomType } from '../room-type/entities/room-type.entity';
export declare class StatsService {
    private bookingRepository;
    private roomTypeRepository;
    constructor(bookingRepository: Repository<Booking>, roomTypeRepository: Repository<RoomType>);
    getSummary(hotelId: string): Promise<{
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
            status: BookingStatus;
            amount: string;
        }[];
        adr: number;
        revpar: number;
    }>;
    getReports(hotelId: string, period?: '7d' | '30d' | '90d'): Promise<{
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
