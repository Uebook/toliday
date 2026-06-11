import { Repository } from 'typeorm';
import { Review, VerticalType } from './entities/review.entity';
export declare class ReviewsService {
    private reviewRepo;
    constructor(reviewRepo: Repository<Review>);
    findAllAdmin(vertical?: VerticalType): Promise<Review[]>;
    updateStatus(id: string, status: string): Promise<Review | null>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
