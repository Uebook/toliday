import { Hotel } from '../../hotel/entities/hotel.entity';
export declare class Rate {
    id: string;
    name: string;
    hotelId: string;
    hotel: Hotel;
    tourPartnerId: string;
    packageId: string;
    roomTypeId: string;
    rate: number;
    childPrice: number;
    infantPrice: number;
    type: string;
    startDate: string;
    endDate: string;
    minNights: number;
    roomTypeName: string;
    createdAt: Date;
    updatedAt: Date;
}
