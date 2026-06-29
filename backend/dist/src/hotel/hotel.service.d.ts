import { Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity';
import { RatePlan } from './entities/rate-plan.entity';
import { Review } from './entities/review.entity';
export declare class HotelService {
    private hotelRepository;
    private ratePlanRepository;
    private reviewRepository;
    constructor(hotelRepository: Repository<Hotel>, ratePlanRepository: Repository<RatePlan>, reviewRepository: Repository<Review>);
    findById(id: string): Promise<Hotel>;
    findAllPublic(): Promise<Hotel[]>;
    findByIdPublic(id: string): Promise<Hotel>;
    findByEmail(email: string): Promise<Hotel | null>;
    update(id: string, dto: Partial<Hotel>): Promise<Hotel>;
    createRatePlan(dto: any): Promise<RatePlan>;
    findRatePlansByRoom(roomTypeId: string): Promise<RatePlan[]>;
    updateRatePlan(id: string, dto: any): Promise<RatePlan>;
    deleteRatePlan(id: string): Promise<void>;
    createReview(dto: any): Promise<Review>;
    findReviewsByHotel(hotelId: string): Promise<Review[]>;
    replyToReview(id: string, vendorReply: string): Promise<Review>;
    reportReview(id: string): Promise<Review>;
}
