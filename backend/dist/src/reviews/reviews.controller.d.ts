import { ReviewsService } from './reviews.service';
import { VerticalType } from './entities/review.entity';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    private checkAdmin;
    findAll(req: any, vertical?: VerticalType): Promise<import("./entities/review.entity").Review[]>;
    updateStatus(req: any, id: string, status: string): Promise<import("./entities/review.entity").Review | null>;
    remove(req: any, id: string): Promise<{
        success: boolean;
    }>;
}
