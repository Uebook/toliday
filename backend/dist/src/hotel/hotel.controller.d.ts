import { HotelService } from './hotel.service';
import { PromotionsService } from '../promotions/promotions.service';
export declare class HotelController {
    private readonly hotelService;
    private readonly promotionsService;
    constructor(hotelService: HotelService, promotionsService: PromotionsService);
    findMyHotel(req: any): Promise<import("./entities/hotel.entity").Hotel>;
    updateMyHotel(req: any, body: Record<string, any>): Promise<import("./entities/hotel.entity").Hotel>;
    createRatePlan(body: any): Promise<import("./entities/rate-plan.entity").RatePlan>;
    findRatePlansByRoom(id: string): Promise<import("./entities/rate-plan.entity").RatePlan[]>;
    updateRatePlan(id: string, body: any): Promise<import("./entities/rate-plan.entity").RatePlan>;
    deleteRatePlan(id: string): Promise<void>;
    findMyReviews(req: any): Promise<import("./entities/review.entity").Review[]>;
    replyToReview(id: string, reply: string): Promise<import("./entities/review.entity").Review>;
    findMyPromotions(req: any): Promise<import("../promotions/entities/promotion.entity").Promotion[]>;
    createPromotion(req: any, body: any): Promise<import("../promotions/entities/promotion.entity").Promotion>;
}
