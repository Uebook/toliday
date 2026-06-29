import { Staff } from '../../staff/entities/staff.entity';
import { RoomType } from '../../room-type/entities/room-type.entity';
import { Booking } from '../../booking/entities/booking.entity';
import { Review } from './review.entity';
export declare enum HotelStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    BLOCKED = "BLOCKED"
}
export declare class Hotel {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    pinCode: string;
    latitude: number;
    longitude: number;
    contactNumber: string;
    website: string;
    email: string;
    stars: number;
    checkInTime: string;
    checkOutTime: string;
    maxAdults: string;
    maxChildren: string;
    childPolicy: string;
    cancellationPolicy: string;
    petPolicy: string;
    amenities: string[];
    images: string[];
    ownerFirstName: string;
    ownerLastName: string;
    ownerPhone: string;
    businessName: string;
    businessType: string;
    gstNumber: string;
    panNumber: string;
    gstDoc: string;
    panDoc: string;
    licenseDoc: string;
    bankHolder: string;
    bankName: string;
    bankAccount: string;
    bankIfsc: string;
    isVerified: boolean;
    sortOrder: number;
    status: HotelStatus;
    staffs: Staff[];
    roomTypes: RoomType[];
    bookings: Booking[];
    reviews: Review[];
    createdAt: Date;
    updatedAt: Date;
}
