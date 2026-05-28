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
exports.CabsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cab_vendor_entity_1 = require("./entities/cab-vendor.entity");
const vehicle_entity_1 = require("./entities/vehicle.entity");
const driver_entity_1 = require("./entities/driver.entity");
const cab_pricing_entity_1 = require("./entities/cab-pricing.entity");
const cab_booking_entity_1 = require("./entities/cab-booking.entity");
let CabsService = class CabsService {
    vendorRepo;
    vehicleRepo;
    driverRepo;
    pricingRepo;
    bookingRepo;
    constructor(vendorRepo, vehicleRepo, driverRepo, pricingRepo, bookingRepo) {
        this.vendorRepo = vendorRepo;
        this.vehicleRepo = vehicleRepo;
        this.driverRepo = driverRepo;
        this.pricingRepo = pricingRepo;
        this.bookingRepo = bookingRepo;
    }
    async findVendorById(id) {
        const vendor = await this.vendorRepo.findOne({ where: { id } });
        if (!vendor)
            throw new common_1.NotFoundException('Vendor not found');
        return vendor;
    }
    async updateVendor(id, data) {
        await this.vendorRepo.update(id, data);
        return this.findVendorById(id);
    }
    async findVehicles(vendorId) {
        return this.vehicleRepo.find({
            where: { vendorId },
            order: { createdAt: 'DESC' },
        });
    }
    async createVehicle(vendorId, data) {
        const vehicle = this.vehicleRepo.create({ ...data, vendorId });
        return this.vehicleRepo.save(vehicle);
    }
    async updateVehicle(id, vendorId, data) {
        await this.vehicleRepo.update({ id, vendorId }, data);
        return this.vehicleRepo.findOne({ where: { id } });
    }
    async deleteVehicle(id, vendorId) {
        return this.vehicleRepo.delete({ id, vendorId });
    }
    async findDrivers(vendorId) {
        return this.driverRepo.find({
            where: { vendorId },
            order: { createdAt: 'DESC' },
        });
    }
    async createDriver(vendorId, data) {
        const driver = this.driverRepo.create({ ...data, vendorId });
        return this.driverRepo.save(driver);
    }
    async updateDriver(id, vendorId, data) {
        await this.driverRepo.update({ id, vendorId }, data);
        return this.driverRepo.findOne({ where: { id } });
    }
    async deleteDriver(id, vendorId) {
        return this.driverRepo.delete({ id, vendorId });
    }
    async findPricing(vendorId) {
        return this.pricingRepo.find({
            where: { vendorId },
            order: { createdAt: 'DESC' },
        });
    }
    async createPricing(vendorId, data) {
        const pricing = this.pricingRepo.create({ ...data, vendorId });
        return this.pricingRepo.save(pricing);
    }
    async deletePricing(id, vendorId) {
        return this.pricingRepo.delete({ id, vendorId });
    }
    async findBookings(vendorId) {
        return this.bookingRepo.find({
            where: { vendorId },
            relations: ['vehicle', 'driver'],
            order: { createdAt: 'DESC' },
        });
    }
    async updateBookingStatus(id, vendorId, status) {
        await this.bookingRepo.update({ id, vendorId }, { status });
        return this.bookingRepo.findOne({ where: { id } });
    }
    async getStats(vendorId) {
        const totalBookings = await this.bookingRepo.count({ where: { vendorId } });
        const activeBookings = await this.bookingRepo.count({
            where: { vendorId, status: cab_booking_entity_1.CabBookingStatus.CONFIRMED },
        });
        const completedBookings = await this.bookingRepo.count({
            where: { vendorId, status: cab_booking_entity_1.CabBookingStatus.COMPLETED },
        });
        const revenueResult = await this.bookingRepo
            .createQueryBuilder('booking')
            .select('SUM(booking.totalAmount)', 'total')
            .where('booking.vendorId = :vendorId', { vendorId })
            .andWhere('booking.status = :status', {
            status: cab_booking_entity_1.CabBookingStatus.COMPLETED,
        })
            .getRawOne();
        const totalVehicles = await this.vehicleRepo.count({ where: { vendorId } });
        const totalDrivers = await this.driverRepo.count({ where: { vendorId } });
        return {
            totalBookings,
            activeBookings,
            completedBookings,
            totalRevenue: parseFloat(revenueResult?.total || '0'),
            totalVehicles,
            totalDrivers,
        };
    }
};
exports.CabsService = CabsService;
exports.CabsService = CabsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cab_vendor_entity_1.CabVendor)),
    __param(1, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __param(2, (0, typeorm_1.InjectRepository)(driver_entity_1.Driver)),
    __param(3, (0, typeorm_1.InjectRepository)(cab_pricing_entity_1.CabPricing)),
    __param(4, (0, typeorm_1.InjectRepository)(cab_booking_entity_1.CabBooking)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CabsService);
//# sourceMappingURL=cabs.service.js.map