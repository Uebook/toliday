import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HotelService } from './hotel.service';
import { PromotionsService } from '../promotions/promotions.service';
import { VerticalType } from '../common/enums/vertical.enum';

@Controller('hotel')
@UseGuards(JwtAuthGuard)
export class HotelController {
  constructor(
    private readonly hotelService: HotelService,
    private readonly promotionsService: PromotionsService,
  ) {}

  @Get('my-hotel')
  findMyHotel(@Request() req) {
    return this.hotelService.findById(req.user.hotelId);
  }

  @Patch('my-hotel')
  updateMyHotel(@Request() req, @Body() body: Record<string, any>) {
    return this.hotelService.update(req.user.hotelId, body);
  }

  // Rate Plans
  @Post('rate-plans')
  createRatePlan(@Body() body: any) {
    return this.hotelService.createRatePlan(body);
  }

  @Get('rooms/:id/rate-plans')
  findRatePlansByRoom(@Param('id') id: string) {
    return this.hotelService.findRatePlansByRoom(id);
  }

  @Patch('rate-plans/:id')
  updateRatePlan(@Param('id') id: string, @Body() body: any) {
    return this.hotelService.updateRatePlan(id, body);
  }

  @Delete('rate-plans/:id')
  deleteRatePlan(@Param('id') id: string) {
    return this.hotelService.deleteRatePlan(id);
  }

  // Reviews
  @Get('my-hotel/reviews')
  findMyReviews(@Request() req) {
    return this.hotelService.findReviewsByHotel(req.user.hotelId);
  }

  @Patch('reviews/:id/reply')
  replyToReview(@Param('id') id: string, @Body('reply') reply: string) {
    return this.hotelService.replyToReview(id, reply);
  }

  @Patch('reviews/:id/report-abuse')
  reportReview(@Param('id') id: string) {
    return this.hotelService.reportReview(id);
  }

  // Promotions
  @Get('my-hotel/promotions')
  findMyPromotions(@Request() req) {
    return this.promotionsService.findAllByVendor(
      req.user.hotelId,
      VerticalType.HOTEL,
    );
  }

  @Post('my-hotel/promotions')
  createPromotion(@Request() req, @Body() body: any) {
    return this.promotionsService.create(
      req.user.hotelId,
      VerticalType.HOTEL,
      body,
    );
  }
}
