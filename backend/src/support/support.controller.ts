import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SupportService } from './support.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Get('faqs')
  async getFaqs() {
    return this.supportService.findAllFaqs();
  }

  @UseGuards(JwtAuthGuard)
  @Post('tickets')
  async createTicket(@Request() req, @Body() dto: CreateTicketDto) {
    const partnerId = req.user.tourPartnerId || req.user.hotelId;
    const type = req.user.tourPartnerId ? 'tour' : 'hotel';
    return this.supportService.createTicket(partnerId, type, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('tickets')
  async getMyTickets(@Request() req) {
    const partnerId = req.user.tourPartnerId || req.user.hotelId;
    const type = req.user.tourPartnerId ? 'tour' : 'hotel';
    return this.supportService.findAllByPartner(partnerId, type);
  }

  @Get('seed')
  async seed() {
    await this.supportService.seedInitialFaqs();
    return { message: 'FAQs seeded successfully' };
  }
}
