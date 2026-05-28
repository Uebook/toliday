import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from '../booking/entities/booking.entity';
import { format, startOfWeek, addDays, subDays, parseISO } from 'date-fns';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async getSummary(hotelId: string) {
    const allBookings = await this.bookingRepository.find({
      where: { hotelId },
      relations: ['roomType'],
    });

    const now = new Date();
    const todayStr = format(now, 'yyyy-MM-dd');

    // Total Revenue
    const totalRevenue = allBookings
      .filter((b) =>
        [
          BookingStatus.CONFIRMED,
          BookingStatus.CHECKED_IN,
          BookingStatus.CHECKED_OUT,
        ].includes(b.status),
      )
      .reduce((sum, b) => sum + Number(b.totalAmount), 0);

    const checkInsToday = allBookings.filter(
      (b) => b.startDate === todayStr && b.status === BookingStatus.CONFIRMED,
    ).length;
    const checkOutsToday = allBookings.filter(
      (b) => b.endDate === todayStr && b.status === BookingStatus.CHECKED_IN,
    ).length;
    const pendingBookings = allBookings.filter(
      (b) => b.status === BookingStatus.PENDING,
    ).length;
    const cancellations = allBookings.filter(
      (b) => b.status === BookingStatus.CANCELLED,
    ).length;
    const activeStay = allBookings.filter(
      (b) =>
        b.startDate <= todayStr &&
        b.endDate > todayStr &&
        [BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN].includes(b.status),
    ).length;

    // Revenue Trend (Mon–Sun)
    const startDate = startOfWeek(now, { weekStartsOn: 1 });
    const revenueTrend: { day: string; revenue: number }[] = [];
    for (let i = 0; i < 7; i++) {
      const dayDate = addDays(startDate, i);
      const dayStr = format(dayDate, 'yyyy-MM-dd');
      const dayLabel = format(dayDate, 'EEE');
      const dayRevenue = allBookings
        .filter(
          (b) =>
            format(new Date(b.createdAt), 'yyyy-MM-dd') === dayStr &&
            [
              BookingStatus.CONFIRMED,
              BookingStatus.CHECKED_IN,
              BookingStatus.CHECKED_OUT,
            ].includes(b.status),
        )
        .reduce((sum, b) => sum + Number(b.totalAmount), 0);
      revenueTrend.push({ day: dayLabel, revenue: dayRevenue });
    }

    // Recent Bookings (last 10)
    const recentBookings = allBookings
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 10)
      .map((b) => ({
        ref: `TLD-${b.id.slice(0, 4).toUpperCase()}`,
        guest: b.guestName,
        room: b.roomType?.name ?? 'N/A',
        checkIn: b.startDate,
        status: b.status,
        amount: `₹${Number(b.totalAmount).toLocaleString()}`,
      }));

    return {
      revenue: totalRevenue,
      checkInsToday,
      checkOutsToday,
      pendingBookings,
      cancellations,
      activeStay,
      totalBookings: allBookings.length,
      revenueTrend,
      recentBookings,
    };
  }

  async getReports(hotelId: string, period: '7d' | '30d' | '90d' = '7d') {
    const allBookings = await this.bookingRepository.find({
      where: { hotelId },
      relations: ['roomType'],
    });

    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const now = new Date();

    const dailyData: {
      date: string;
      revenue: number;
      bookings: number;
      cancellations: number;
      occupancy: number;
    }[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const day = subDays(now, i);
      const dayStr = format(day, 'yyyy-MM-dd');
      const dateLabel = format(day, 'MMM d');

      const dayBookings = allBookings.filter((b) => format(new Date(b.createdAt), 'yyyy-MM-dd') === dayStr);
      const revenue = dayBookings
        .filter((b) =>
          [
            BookingStatus.CONFIRMED,
            BookingStatus.CHECKED_IN,
            BookingStatus.CHECKED_OUT,
          ].includes(b.status),
        )
        .reduce((s, b) => s + Number(b.totalAmount), 0);
      const bookingsCount = dayBookings.filter(
        (b) => b.status !== BookingStatus.CANCELLED,
      ).length;
      const cancellationsCount = dayBookings.filter(
        (b) => b.status === BookingStatus.CANCELLED,
      ).length;
      const activeDay = allBookings.filter(
        (b) =>
          b.startDate <= dayStr &&
          b.endDate > dayStr &&
          [BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN].includes(
            b.status,
          ),
      ).length;
      const occupancy = Math.min(100, Math.round((activeDay / 10) * 100)); // assumes ~10 rooms total

      dailyData.push({
        date: dateLabel,
        revenue,
        bookings: bookingsCount,
        cancellations: cancellationsCount,
        occupancy,
      });
    }

    // Aggregated totals
    const totalRevenue = dailyData.reduce((s, d) => s + d.revenue, 0);
    const totalBookings = dailyData.reduce((s, d) => s + d.bookings, 0);
    const totalCancellations = dailyData.reduce(
      (s, d) => s + d.cancellations,
      0,
    );
    const avgOccupancy = Math.round(
      dailyData.reduce((s, d) => s + d.occupancy, 0) / days,
    );

    // Booking sources — for now use a static ratio (can be added as a field in booking entity later)
    const sourceData = [
      { name: 'TolidayTrip App', value: 58 },
      { name: 'Direct', value: 22 },
      { name: 'Website', value: 12 },
      { name: 'Walk-in', value: 8 },
    ];

    return {
      dailyData,
      totalRevenue,
      totalBookings,
      totalCancellations,
      avgOccupancy,
      sourceData,
    };
  }
}
