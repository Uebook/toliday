import { Hotel } from './hotel.entity';
export declare class Review {
    id: string;
    guestName: string;
    rating: number;
    comment: string;
    vendorReply: string;
    vendorReplyAt: Date;
    hotelId: string;
    hotel: Hotel;
    isVisible: boolean;
    createdAt: Date;
    updatedAt: Date;
}
