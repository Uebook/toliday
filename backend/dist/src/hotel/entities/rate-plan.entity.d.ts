import { RoomType } from '../../room-type/entities/room-type.entity';
export declare enum MealPlan {
    EP = "EP",
    CP = "CP",
    MAP = "MAP",
    AP = "AP"
}
export declare class RatePlan {
    id: string;
    name: string;
    mealPlan: MealPlan;
    markupAmount: number;
    markupPercentage: number;
    isRefundable: boolean;
    cancellationPolicy: string;
    inclusions: string[];
    roomTypeId: string;
    roomType: RoomType;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
