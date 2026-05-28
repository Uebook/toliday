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
exports.BusesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bus_vendor_entity_1 = require("./entities/bus-vendor.entity");
const bus_entity_1 = require("./entities/bus.entity");
const bus_route_entity_1 = require("./entities/bus-route.entity");
const bus_schedule_entity_1 = require("./entities/bus-schedule.entity");
const seat_layout_entity_1 = require("./entities/seat-layout.entity");
const crew_entity_1 = require("./entities/crew.entity");
const bus_booking_entity_1 = require("./entities/bus-booking.entity");
const yield_rule_entity_1 = require("./entities/yield-rule.entity");
const schedule_1 = require("@nestjs/schedule");
let BusesService = class BusesService {
    vendorRepo;
    busRepo;
    routeRepo;
    scheduleRepo;
    layoutRepo;
    crewRepo;
    bookingRepo;
    yieldRuleRepo;
    constructor(vendorRepo, busRepo, routeRepo, scheduleRepo, layoutRepo, crewRepo, bookingRepo, yieldRuleRepo) {
        this.vendorRepo = vendorRepo;
        this.busRepo = busRepo;
        this.routeRepo = routeRepo;
        this.scheduleRepo = scheduleRepo;
        this.layoutRepo = layoutRepo;
        this.crewRepo = crewRepo;
        this.bookingRepo = bookingRepo;
        this.yieldRuleRepo = yieldRuleRepo;
    }
    async findAllVendors() {
        return this.vendorRepo.find();
    }
    async findVendorById(id) {
        const vendor = await this.vendorRepo.findOne({
            where: { id },
            relations: ['staffs', 'buses'],
        });
        if (!vendor)
            throw new common_1.NotFoundException('Vendor not found');
        return vendor;
    }
    async createVendor(data) {
        const vendor = this.vendorRepo.create(data);
        return this.vendorRepo.save(vendor);
    }
    async updateVendor(id, data) {
        await this.vendorRepo.update(id, data);
        return this.findVendorById(id);
    }
    async findBusesByVendor(vendorId) {
        return this.busRepo.find({
            where: { vendorId },
            relations: ['seatLayouts'],
        });
    }
    async createBus(data) {
        const bus = this.busRepo.create(data);
        return this.busRepo.save(bus);
    }
    async findAllRoutes() {
        return this.routeRepo.find();
    }
    async createRoute(data) {
        const route = this.routeRepo.create(data);
        return this.routeRepo.save(route);
    }
    async findSchedulesByRoute(routeId) {
        return this.scheduleRepo.find({
            where: { routeId },
            relations: ['bus', 'driver', 'conductor'],
        });
    }
    async createSchedule(data) {
        const schedule = this.scheduleRepo.create(data);
        return this.scheduleRepo.save(schedule);
    }
    async findSeatLayout(busId) {
        return this.layoutRepo.find({
            where: { busId },
            order: { deck: 'ASC', row: 'ASC', column: 'ASC' },
        });
    }
    async saveSeatLayout(busId, layouts) {
        await this.layoutRepo.delete({ busId });
        const entities = layouts.map((l) => this.layoutRepo.create({ ...l, busId }));
        return this.layoutRepo.save(entities);
    }
    async findCrewByVendor(vendorId) {
        return this.crewRepo.find({ where: { vendorId } });
    }
    async createCrewMember(data) {
        const crew = this.crewRepo.create(data);
        return this.crewRepo.save(crew);
    }
    async findBookingsBySchedule(scheduleId) {
        return this.bookingRepo.find({ where: { scheduleId } });
    }
    async createBooking(data) {
        const booking = this.bookingRepo.create(data);
        return this.bookingRepo.save(booking);
    }
    async findYieldRulesByBus(busId) {
        return this.yieldRuleRepo.find({ where: { busId } });
    }
    async createYieldRule(busId, data) {
        const rule = this.yieldRuleRepo.create({ ...data, busId });
        return this.yieldRuleRepo.save(rule);
    }
    async getStats(vendorId) {
        const totalBuses = await this.busRepo.count({ where: { vendorId } });
        const totalRoutes = await this.routeRepo.count();
        const bookings = await this.bookingRepo
            .createQueryBuilder('booking')
            .innerJoinAndSelect('booking.schedule', 'schedule')
            .innerJoinAndSelect('schedule.bus', 'bus')
            .where('bus.vendorId = :vendorId', { vendorId })
            .getMany();
        const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.totalFare) || 0), 0);
        const totalTickets = bookings.length;
        return {
            totalBuses,
            totalRoutes,
            totalRevenue,
            totalTickets,
            activeTrips: 5,
        };
    }
    async searchPublicBuses(query) {
        const qb = this.scheduleRepo.createQueryBuilder('schedule')
            .innerJoinAndSelect('schedule.route', 'route')
            .innerJoinAndSelect('schedule.bus', 'bus')
            .where('route.originCity ILIKE :origin', { origin: `%${query.origin}%` })
            .andWhere('route.destinationCity ILIKE :dest', { dest: `%${query.destination}%` })
            .andWhere('schedule.status = :status', { status: 'SCHEDULED' });
        if (query.date) {
            qb.andWhere('schedule.departureDate = :date', { date: query.date });
        }
        return qb.getMany();
    }
    async getSeatMatrix(scheduleId) {
        const schedule = await this.scheduleRepo.findOne({
            where: { id: scheduleId },
            relations: ['bus', 'bus.seatLayouts']
        });
        if (!schedule)
            throw new common_1.NotFoundException('Schedule not found');
        const activeBookings = await this.bookingRepo.find({
            where: [
                { scheduleId, status: bus_booking_entity_1.BookingStatus.CONFIRMED },
                { scheduleId, status: bus_booking_entity_1.BookingStatus.PENDING }
            ]
        });
        const lockedSeats = activeBookings.flatMap(b => b.selectedSeats);
        return {
            layout: schedule.bus.seatLayouts,
            lockedSeats,
            schedule
        };
    }
    async lockSeats(data) {
        const matrix = await this.getSeatMatrix(data.scheduleId);
        const requestedSeats = data.selectedSeats;
        const conflict = requestedSeats.some(seat => matrix.lockedSeats.includes(seat));
        if (conflict) {
            throw new Error('Some of the selected seats have just been booked by another user.');
        }
        const booking = this.bookingRepo.create({
            ...data,
            pnr: `PNR${Date.now().toString().substring(4)}`,
            status: bus_booking_entity_1.BookingStatus.PENDING,
        });
        return this.bookingRepo.save(booking);
    }
    async cleanupExpiredPendingBookings() {
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
        const expiredBookings = await this.bookingRepo.find({
            where: {
                status: bus_booking_entity_1.BookingStatus.PENDING,
            },
        });
        const strictlyExpired = expiredBookings.filter(b => b.createdAt < tenMinutesAgo);
        for (const booking of strictlyExpired) {
            booking.status = bus_booking_entity_1.BookingStatus.CANCELLED;
            await this.bookingRepo.save(booking);
            console.log(`[Bus System] Released locked seats for expired booking: ${booking.id}`);
        }
    }
};
exports.BusesService = BusesService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BusesService.prototype, "cleanupExpiredPendingBookings", null);
exports.BusesService = BusesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bus_vendor_entity_1.BusVendor)),
    __param(1, (0, typeorm_1.InjectRepository)(bus_entity_1.Bus)),
    __param(2, (0, typeorm_1.InjectRepository)(bus_route_entity_1.BusRoute)),
    __param(3, (0, typeorm_1.InjectRepository)(bus_schedule_entity_1.BusSchedule)),
    __param(4, (0, typeorm_1.InjectRepository)(seat_layout_entity_1.SeatLayout)),
    __param(5, (0, typeorm_1.InjectRepository)(crew_entity_1.Crew)),
    __param(6, (0, typeorm_1.InjectRepository)(bus_booking_entity_1.BusBooking)),
    __param(7, (0, typeorm_1.InjectRepository)(yield_rule_entity_1.YieldRule)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BusesService);
//# sourceMappingURL=buses.service.js.map