import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Hotel, HotelStatus } from './hotel/entities/hotel.entity';
import { TourPartner, PartnerStatus } from './packages/entities/tour-partner.entity';
import { BusVendor, BusVendorStatus } from './buses/entities/bus-vendor.entity';
import { CabVendor } from './cabs/entities/cab-vendor.entity';
import { Booking, BookingStatus } from './booking/entities/booking.entity';
import { BusBooking, BookingStatus as BusBookingStatus } from './buses/entities/bus-booking.entity';
import { CabBooking, CabBookingStatus } from './cabs/entities/cab-booking.entity';
import { RoomType } from './room-type/entities/room-type.entity';
import { TourPackage, PackageStatus } from './packages/entities/tour-package.entity';
import { Bus, BusType } from './buses/entities/bus.entity';
import { Vehicle, VehicleCategory } from './cabs/entities/vehicle.entity';
import { Driver } from './cabs/entities/driver.entity';
import { Promotion, PromotionType } from './promotions/entities/promotion.entity';
import { VerticalType } from './common/enums/vertical.enum';
import { Repository } from 'typeorm';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    
    const hotelRepo = app.get('HotelRepository') as Repository<Hotel>;
    const tourRepo = app.get('TourPartnerRepository') as Repository<TourPartner>;
    const busRepo = app.get('BusVendorRepository') as Repository<BusVendor>;
    const cabRepo = app.get('CabVendorRepository') as Repository<CabVendor>;
    const bookingRepo = app.get('BookingRepository') as Repository<Booking>;
    const busBookingRepo = app.get('BusBookingRepository') as Repository<BusBooking>;
    const cabBookingRepo = app.get('CabBookingRepository') as Repository<CabBooking>;
    
    const roomTypeRepo = app.get('RoomTypeRepository') as Repository<RoomType>;
    const tourPkgRepo = app.get('TourPackageRepository') as Repository<TourPackage>;
    const busBusRepo = app.get('BusRepository') as Repository<Bus>;
    const cabVehicleRepo = app.get('VehicleRepository') as Repository<Vehicle>;
    const cabDriverRepo = app.get('DriverRepository') as Repository<Driver>;
    const promoRepo = app.get('PromotionRepository') as Repository<Promotion>;

    const suffix = Math.random().toString(36).substring(7);
    console.log('Seeding comprehensive data with offers, suffix:', suffix);

    // Seed Hotels & Rooms & Offers
    const hotels: Hotel[] = [];
    for(let i=1; i<=2; i++) {
        const h = await hotelRepo.save(hotelRepo.create({
            name: `Royal Heritage ${i} ${suffix}`,
            email: `hotel_h${i}_${suffix}@example.com`,
            city: ['Jaipur', 'Udaipur'][i-1],
            status: HotelStatus.APPROVED,
            isVerified: true,
            contactNumber: `91122233${i}`
        }));
        hotels.push(h);

        await roomTypeRepo.save(roomTypeRepo.create({
            name: 'Deluxe Suite',
            price: 4500,
            capacity: 2,
            hotelId: h.id,
        }));

        // Seed Promotion for Hotel
        await promoRepo.save(promoRepo.create({
            name: 'Summer Bonanza',
            type: PromotionType.BASIC,
            vertical: VerticalType.HOTEL,
            vendorId: h.id,
            discountPercentage: 15,
            isActive: true
        }));
    }

    // Seed Tour Partners & Packages & Offers
    const partners: TourPartner[] = [];
    for(let i=1; i<=2; i++) {
        const p = await tourRepo.save(tourRepo.create({
            name: `Agency Manager ${i}`,
            businessName: `Skyline Travels ${i} ${suffix}`,
            email: `tour_p${i}_${suffix}@example.com`,
            status: PartnerStatus.APPROVED,
            isVerified: true,
            contactNumber: `81122233${i}`
        }));
        partners.push(p);

        await tourPkgRepo.save(tourPkgRepo.create({
            title: `Golden Triangle Tour ${i}`,
            duration: '4 Days / 3 Nights',
            basePrice: 15000,
            salePrice: 12500,
            partnerId: p.id,
            status: PackageStatus.ACTIVE
        }));

        // Seed Promotion for Tour
        await promoRepo.save(promoRepo.create({
            name: 'Early Bird Special',
            type: PromotionType.EARLY_BIRD,
            vertical: VerticalType.PACKAGE,
            vendorId: p.id,
            discountPercentage: 20,
            isActive: true
        }));
    }

    // Seed Bus Vendors & Fleet & Offers
    for(let i=1; i<=2; i++) {
        const b = await busRepo.save(busRepo.create({
            name: `Operations Head ${i}`,
            businessName: `Intercity Connect ${i} ${suffix}`,
            email: `bus_v${i}_${suffix}@example.com`,
            status: BusVendorStatus.APPROVED,
            isVerified: true,
            contactNumber: `71122233${i}`
        }));

        await busBusRepo.save(busBusRepo.create({
            registrationNumber: `DL 01 BU ${1000+i}`,
            type: BusType.AC_SLEEPER,
            totalSeats: 36,
            vendorId: b.id,
        }));

        // Seed Promotion for Bus
        await promoRepo.save(promoRepo.create({
            name: 'Flash Sale',
            type: PromotionType.LAST_MINUTE,
            vertical: VerticalType.BUS,
            vendorId: b.id,
            discountPercentage: 10,
            isActive: true
        }));
    }

    // Seed Cab Vendors & Offers
    for(let i=1; i<=2; i++) {
        const c = await cabRepo.save(cabRepo.create({
            name: `Fleet Supervisor ${i}`,
            companyName: `Quick Cab ${i} ${suffix}`,
            email: `cab_v${i}_${suffix}@example.com`,
            isVerified: true,
            phone: `61122233${i}`
        }));

        // Seed Promotion for Cab
        await promoRepo.save(promoRepo.create({
            name: 'First Ride Free (Up to 50%)',
            type: PromotionType.BASIC,
            vertical: VerticalType.CAB,
            vendorId: c.id,
            discountPercentage: 50,
            isActive: true
        }));
    }

    console.log('Seeding completed successfully with offers!');
    await app.close();
}
bootstrap();
