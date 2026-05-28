import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findAll(@Query('hotelId') hotelId: string) {
    return this.notificationsService.findAll(hotelId);
  }

  @Post()
  create(@Body() body: any) {
    const { hotelId, ...rest } = body;
    return this.notificationsService.create(hotelId, rest);
  }

  @Get('settings')
  getSettings(@Query('hotelId') hotelId: string) {
    return this.notificationsService.getSettings(hotelId);
  }

  @Patch('settings')
  updateSettings(@Query('hotelId') hotelId: string, @Body() dto: any) {
    return this.notificationsService.updateSettings(hotelId, dto);
  }

  @Patch('read-all')
  markAllRead(@Query('hotelId') hotelId: string) {
    return this.notificationsService.markAllRead(hotelId);
  }

  @Patch(':id/read')
  markRead(@Param('id') id: string) {
    return this.notificationsService.markRead(id);
  }
}
