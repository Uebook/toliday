import { Hotel } from '../../hotel/entities/hotel.entity';
export declare class Media {
    id: string;
    hotelId: string;
    hotel: Hotel;
    tourPartnerId: string;
    busVendorId: string;
    cabVendorId: string;
    packageId: string;
    name: string;
    url: string;
    category: string;
    size: string;
    createdAt: Date;
}
