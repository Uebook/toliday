import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ReviewsService } from './reviews.service';
import { VerticalType } from './entities/review.entity';
import { StaffRole } from '../staff/entities/staff.entity';

@Controller('reviews')
@UseGuards(JwtAuthGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  private checkAdmin(req: any) {
    if (req.user.role !== StaffRole.ADMIN && req.user.role !== StaffRole.OWNER && req.user.role !== 'superadmin') {
      throw new UnauthorizedException('Admin access required');
    }
  }

  @Get('admin/all')
  findAll(@Request() req: any, @Query('vertical') vertical?: VerticalType) {
    this.checkAdmin(req);
    return this.reviewsService.findAllAdmin(vertical);
  }

  @Patch('admin/:id/status')
  updateStatus(
    @Request() req: any,
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    this.checkAdmin(req);
    return this.reviewsService.updateStatus(id, status);
  }

  @Delete('admin/:id')
  remove(@Request() req: any, @Param('id') id: string) {
    this.checkAdmin(req);
    return this.reviewsService.remove(id);
  }
}
