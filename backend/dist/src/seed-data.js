"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const hotel_entity_1 = require("./hotel/entities/hotel.entity");
const tour_partner_entity_1 = require("./packages/entities/tour-partner.entity");
const bus_vendor_entity_1 = require("./buses/entities/bus-vendor.entity");
const tour_package_entity_1 = require("./packages/entities/tour-package.entity");
const bus_entity_1 = require("./buses/entities/bus.entity");
const promotion_entity_1 = require("./promotions/entities/promotion.entity");
const vertical_enum_1 = require("./common/enums/vertical.enum");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const hotelRepo = app.get('HotelRepository');
    const tourRepo = app.get('TourPartnerRepository');
    const busRepo = app.get('BusVendorRepository');
    const cabRepo = app.get('CabVendorRepository');
    const bookingRepo = app.get('BookingRepository');
    const busBookingRepo = app.get('BusBookingRepository');
    const cabBookingRepo = app.get('CabBookingRepository');
    const roomTypeRepo = app.get('RoomTypeRepository');
    const tourPkgRepo = app.get('TourPackageRepository');
    const busBusRepo = app.get('BusRepository');
    const cabVehicleRepo = app.get('VehicleRepository');
    const cabDriverRepo = app.get('DriverRepository');
    const promoRepo = app.get('PromotionRepository');
    const suffix = Math.random().toString(36).substring(7);
    console.log('Seeding comprehensive data with offers, suffix:', suffix);
    const hotels = [];
    for (let i = 1; i <= 3; i++) {
        const h = await hotelRepo.save(hotelRepo.create({
            name: `Royal Heritage ${i} ${suffix}`,
            email: `hotel_h${i}_${suffix}@example.com`,
            city: ['Jaipur', 'Udaipur', 'Noida (NCR)'][i - 1],
            status: hotel_entity_1.HotelStatus.APPROVED,
            isVerified: true,
            contactNumber: `91122233${i}`,
        }));
        hotels.push(h);
        await roomTypeRepo.save(roomTypeRepo.create({
            name: 'Deluxe Suite',
            price: 4500,
            capacity: 2,
            hotelId: h.id,
        }));
        await promoRepo.save(promoRepo.create({
            name: 'Summer Bonanza',
            type: promotion_entity_1.PromotionType.BASIC,
            vertical: vertical_enum_1.VerticalType.HOTEL,
            vendorId: h.id,
            discountPercentage: 15,
            isActive: true,
        }));
    }
    const partners = [];
    for (let i = 1; i <= 2; i++) {
        const p = await tourRepo.save(tourRepo.create({
            name: `Agency Manager ${i}`,
            businessName: `Skyline Travels ${i} ${suffix}`,
            email: `tour_p${i}_${suffix}@example.com`,
            status: tour_partner_entity_1.PartnerStatus.APPROVED,
            isVerified: true,
            contactNumber: `81122233${i}`,
        }));
        partners.push(p);
        await tourPkgRepo.save(tourPkgRepo.create({
            title: `Golden Triangle Tour ${i}`,
            duration: '4 Days / 3 Nights',
            basePrice: 15000,
            salePrice: 12500,
            partnerId: p.id,
            status: tour_package_entity_1.PackageStatus.ACTIVE,
        }));
        await promoRepo.save(promoRepo.create({
            name: 'Early Bird Special',
            type: promotion_entity_1.PromotionType.EARLY_BIRD,
            vertical: vertical_enum_1.VerticalType.PACKAGE,
            vendorId: p.id,
            discountPercentage: 20,
            isActive: true,
        }));
    }
    for (let i = 1; i <= 2; i++) {
        const b = await busRepo.save(busRepo.create({
            name: `Operations Head ${i}`,
            businessName: `Intercity Connect ${i} ${suffix}`,
            email: `bus_v${i}_${suffix}@example.com`,
            status: bus_vendor_entity_1.BusVendorStatus.APPROVED,
            isVerified: true,
            contactNumber: `71122233${i}`,
        }));
        await busBusRepo.save(busBusRepo.create({
            registrationNumber: `DL 01 BU ${1000 + i}`,
            type: bus_entity_1.BusType.AC_SLEEPER,
            totalSeats: 36,
            vendorId: b.id,
        }));
        await promoRepo.save(promoRepo.create({
            name: 'Flash Sale',
            type: promotion_entity_1.PromotionType.LAST_MINUTE,
            vertical: vertical_enum_1.VerticalType.BUS,
            vendorId: b.id,
            discountPercentage: 10,
            isActive: true,
        }));
    }
    for (let i = 1; i <= 2; i++) {
        const c = await cabRepo.save(cabRepo.create({
            name: `Fleet Supervisor ${i}`,
            companyName: `Quick Cab ${i} ${suffix}`,
            email: `cab_v${i}_${suffix}@example.com`,
            isVerified: true,
            phone: `61122233${i}`,
        }));
        await promoRepo.save(promoRepo.create({
            name: 'First Ride Free (Up to 50%)',
            type: promotion_entity_1.PromotionType.BASIC,
            vertical: vertical_enum_1.VerticalType.CAB,
            vendorId: c.id,
            discountPercentage: 50,
            isActive: true,
        }));
    }
    console.log('Seeding completed successfully with offers!');
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed-data.js.map