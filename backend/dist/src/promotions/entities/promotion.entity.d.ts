import { VerticalType } from '../..//common/enums/vertical.enum';
export declare enum PromotionType {
    BASIC = "BASIC",
    EARLY_BIRD = "EARLY_BIRD",
    LAST_MINUTE = "LAST_MINUTE",
    GEO_TARGETED = "GEO_TARGETED"
}
export declare class Promotion {
    id: string;
    name: string;
    type: PromotionType;
    vertical: VerticalType;
    vendorId: string;
    discountPercentage: number;
    bookingStartDate: string;
    bookingEndDate: string;
    stayStartDate: string;
    stayEndDate: string;
    minAdvanceDays: number;
    maxAdvanceDays: number;
    targetRegion: string;
    isActive: boolean;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}
