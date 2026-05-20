import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity';
import { RatePlan } from './entities/rate-plan.entity';
import { Review } from './entities/review.entity';

@Injectable()
export class HotelService {
       constructor(
              @InjectRepository(Hotel)
              private hotelRepository: Repository<Hotel>,
              @InjectRepository(RatePlan)
              private ratePlanRepository: Repository<RatePlan>,
              @InjectRepository(Review)
              private reviewRepository: Repository<Review>,
       ) { }

       async findById(id: string): Promise<Hotel> {
              const hotel = await this.hotelRepository.findOne({ where: { id } });
              if (!hotel) throw new NotFoundException('Hotel not found');
              return hotel;
       }

       async findByEmail(email: string): Promise<Hotel | null> {
              return this.hotelRepository.findOne({ where: { email } });
       }

       async update(id: string, dto: Partial<Hotel>): Promise<Hotel> {
              await this.hotelRepository.update(id, dto);
              return this.findById(id);
       }

       // Rate Plan Methods
        async createRatePlan(dto: any): Promise<RatePlan> {
            const plan = this.ratePlanRepository.create(dto) as any;
            return this.ratePlanRepository.save(plan) as Promise<RatePlan>;
        }

       async findRatePlansByRoom(roomTypeId: string): Promise<RatePlan[]> {
           return this.ratePlanRepository.find({ where: { roomTypeId } });
       }

       // Review Methods
        async createReview(dto: any): Promise<Review> {
            const review = this.reviewRepository.create(dto) as any;
            return this.reviewRepository.save(review) as Promise<Review>;
        }

       async findReviewsByHotel(hotelId: string): Promise<Review[]> {
           return this.reviewRepository.find({ where: { hotelId }, order: { createdAt: 'DESC' } });
       }

       async replyToReview(id: string, vendorReply: string): Promise<Review> {
           await this.reviewRepository.update(id, { vendorReply, vendorReplyAt: new Date() });
           const review = await this.reviewRepository.findOne({ where: { id } });
           if (!review) throw new NotFoundException('Review not found');
           return review;
       }
}
