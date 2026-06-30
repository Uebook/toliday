"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("../booking/entities/booking.entity");
const date_fns_1 = require("date-fns");
const room_type_entity_1 = require("../room-type/entities/room-type.entity");
let StatsService = class StatsService {
    bookingRepository;
    roomTypeRepository;
    constructor(bookingRepository, roomTypeRepository) {
        this.bookingRepository = bookingRepository;
        this.roomTypeRepository = roomTypeRepository;
    }
    async getSummary(hotelId) {
        const allBookings = await this.bookingRepository.find({
            where: { hotelId },
            relations: ['roomType'],
        });
        const now = new Date();
        const todayStr = (0, date_fns_1.format)(now, 'yyyy-MM-dd');
        const totalRevenue = allBookings
            .filter((b) => [
            booking_entity_1.BookingStatus.CONFIRMED,
            booking_entity_1.BookingStatus.CHECKED_IN,
            booking_entity_1.BookingStatus.CHECKED_OUT,
        ].includes(b.status))
            .reduce((sum, b) => sum + Number(b.totalAmount), 0);
        const checkInsToday = allBookings.filter((b) => b.startDate === todayStr && b.status === booking_entity_1.BookingStatus.CONFIRMED).length;
        const checkOutsToday = allBookings.filter((b) => b.endDate === todayStr && b.status === booking_entity_1.BookingStatus.CHECKED_IN).length;
        const pendingBookings = allBookings.filter((b) => b.status === booking_entity_1.BookingStatus.PENDING).length;
        const cancellations = allBookings.filter((b) => b.status === booking_entity_1.BookingStatus.CANCELLED).length;
        const activeStay = allBookings.filter((b) => b.startDate <= todayStr &&
            b.endDate > todayStr &&
            [booking_entity_1.BookingStatus.CONFIRMED, booking_entity_1.BookingStatus.CHECKED_IN].includes(b.status)).length;
        const startDate = (0, date_fns_1.startOfWeek)(now, { weekStartsOn: 1 });
        const revenueTrend = [];
        for (let i = 0; i < 7; i++) {
            const dayDate = (0, date_fns_1.addDays)(startDate, i);
            const dayStr = (0, date_fns_1.format)(dayDate, 'yyyy-MM-dd');
            const dayLabel = (0, date_fns_1.format)(dayDate, 'EEE');
            const dayRevenue = allBookings
                .filter((b) => (0, date_fns_1.format)(new Date(b.createdAt), 'yyyy-MM-dd') === dayStr &&
                [
                    booking_entity_1.BookingStatus.CONFIRMED,
                    booking_entity_1.BookingStatus.CHECKED_IN,
                    booking_entity_1.BookingStatus.CHECKED_OUT,
                ].includes(b.status))
                .reduce((sum, b) => sum + Number(b.totalAmount), 0);
            revenueTrend.push({ day: dayLabel, revenue: dayRevenue });
        }
        const recentBookings = allBookings
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 10)
            .map((b) => ({
            ref: `TLD-${b.id.slice(0, 4).toUpperCase()}`,
            guest: b.guestName,
            room: b.roomType?.name ?? 'N/A',
            checkIn: b.startDate,
            status: b.status,
            amount: `₹${Number(b.totalAmount).toLocaleString()}`,
        }));
        const occupiedRoomsToday = allBookings.filter((b) => b.startDate <= todayStr &&
            b.endDate >= todayStr &&
            [booking_entity_1.BookingStatus.CONFIRMED, booking_entity_1.BookingStatus.CHECKED_IN].includes(b.status)).length;
        const roomTypes = await this.roomTypeRepository.find({ where: { hotelId } });
        const totalCapacity = roomTypes.reduce((sum, rt) => sum + (Number(rt.totalRooms) || 0), 0);
        const activeOrCompletedBookings = allBookings.filter((b) => [booking_entity_1.BookingStatus.CONFIRMED, booking_entity_1.BookingStatus.CHECKED_IN, booking_entity_1.BookingStatus.CHECKED_OUT].includes(b.status));
        const adr = activeOrCompletedBookings.length > 0
            ? Math.round(totalRevenue / activeOrCompletedBookings.length)
            : 0;
        const occupancyRate = totalCapacity > 0 ? (occupiedRoomsToday / totalCapacity) : 0;
        const revpar = Math.round(adr * occupancyRate);
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
            adr,
            revpar,
        };
    }
    async getReports(hotelId, period = '7d') {
        const allBookings = await this.bookingRepository.find({
            where: { hotelId },
            relations: ['roomType'],
        });
        const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
        const now = new Date();
        const dailyData = [];
        const roomTypes = await this.roomTypeRepository.find({ where: { hotelId } });
        const totalCapacity = roomTypes.reduce((sum, rt) => sum + (Number(rt.totalRooms) || 0), 0) || 10;
        for (let i = days - 1; i >= 0; i--) {
            const day = (0, date_fns_1.subDays)(now, i);
            const dayStr = (0, date_fns_1.format)(day, 'yyyy-MM-dd');
            const dateLabel = (0, date_fns_1.format)(day, 'MMM d');
            const dayBookings = allBookings.filter((b) => (0, date_fns_1.format)(new Date(b.createdAt), 'yyyy-MM-dd') === dayStr);
            const revenue = dayBookings
                .filter((b) => [
                booking_entity_1.BookingStatus.CONFIRMED,
                booking_entity_1.BookingStatus.CHECKED_IN,
                booking_entity_1.BookingStatus.CHECKED_OUT,
            ].includes(b.status))
                .reduce((s, b) => s + Number(b.totalAmount), 0);
            const bookingsCount = dayBookings.filter((b) => b.status !== booking_entity_1.BookingStatus.CANCELLED).length;
            const cancellationsCount = dayBookings.filter((b) => b.status === booking_entity_1.BookingStatus.CANCELLED).length;
            const activeDay = allBookings.filter((b) => b.startDate <= dayStr &&
                b.endDate > dayStr &&
                [booking_entity_1.BookingStatus.CONFIRMED, booking_entity_1.BookingStatus.CHECKED_IN].includes(b.status)).length;
            const occupancy = Math.min(100, Math.round((activeDay / totalCapacity) * 100));
            dailyData.push({
                date: dateLabel,
                revenue,
                bookings: bookingsCount,
                cancellations: cancellationsCount,
                occupancy,
            });
        }
        const totalRevenue = dailyData.reduce((s, d) => s + d.revenue, 0);
        const totalBookings = dailyData.reduce((s, d) => s + d.bookings, 0);
        const totalCancellations = dailyData.reduce((s, d) => s + d.cancellations, 0);
        const avgOccupancy = Math.round(dailyData.reduce((s, d) => s + d.occupancy, 0) / days);
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
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __param(1, (0, typeorm_1.InjectRepository)(room_type_entity_1.RoomType)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StatsService);
//# sourceMappingURL=stats.service.js.map