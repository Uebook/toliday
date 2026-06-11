export declare enum VerticalType {
    HOTEL = "HOTEL",
    PACKAGE = "PACKAGE",
    BUS = "BUS",
    CAB = "CAB"
}
export declare class Review {
    id: string;
    vendorId: string;
    vertical: VerticalType;
    vendorName: string;
    guestName: string;
    rating: number;
    comment: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
