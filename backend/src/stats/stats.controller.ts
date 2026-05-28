import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { StatsService } from './stats.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('summary')
  getSummary(@Request() req) {
    const hotelId = req.user.hotelId;
    return this.statsService.getSummary(hotelId);
  }

  @Get('reports')
  getReports(
    @Request() req,
    @Query('period') period: '7d' | '30d' | '90d' = '7d',
  ) {
    const hotelId = req.user.hotelId;
    return this.statsService.getReports(hotelId, period);
  }
}
