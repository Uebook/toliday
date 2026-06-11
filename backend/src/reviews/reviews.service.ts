import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review, VerticalType } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,
  ) {}

  async findAllAdmin(vertical?: VerticalType) {
    const where = vertical ? { vertical } : {};
    return this.reviewRepo.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(id: string, status: string) {
    await this.reviewRepo.update(id, { status });
    return this.reviewRepo.findOne({ where: { id } });
  }

  async remove(id: string) {
    await this.reviewRepo.delete(id);
    return { success: true };
  }
}
