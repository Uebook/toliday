import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
export declare class PublicBookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    createPublic(body: CreateBookingDto & {
        hotelId: string;
    }): Promise<import("./entities/booking.entity").Booking>;
    findAllByEmail(email: string): Promise<import("./entities/booking.entity").Booking[]>;
}
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    create(req: any, createDto: CreateBookingDto): Promise<import("./entities/booking.entity").Booking>;
    findAllGlobal(req: any): Promise<import("./entities/booking.entity").Booking[]>;
    findAll(req: any): Promise<import("./entities/booking.entity").Booking[]>;
    findOne(req: any, id: string): Promise<import("./entities/booking.entity").Booking>;
    updateStatus(req: any, id: string, updateDto: UpdateBookingStatusDto): Promise<import("./entities/booking.entity").Booking>;
    assignRoom(req: any, id: string, roomId: string): Promise<import("./entities/booking.entity").Booking>;
    getAdminConsumers(req: any): Promise<{
        id: any;
        name: any;
        email: any;
        phone: any;
        totalBookings: number;
        ltv: number;
        status: string;
        lastActive: any;
        kycStatus: string;
    }[]>;
}
