export declare enum VerticalType {
    HOTEL = "HOTEL",
    PACKAGE = "PACKAGE",
    BUS = "BUS",
    CAB = "CAB"
}
export declare class GlobalInventory {
    id: string;
    vendorId: string;
    vertical: VerticalType;
    resourceId: string;
    resourceName: string;
    date: string;
    totalUnits: number;
    availableUnits: number;
    basePrice: number;
    priceOverride: number;
    createdAt: Date;
    updatedAt: Date;
}
