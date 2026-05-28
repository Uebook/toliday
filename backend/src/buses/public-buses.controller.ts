import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { BusesService } from './buses.service';

@Controller('public/buses')
export class PublicBusesController {
  constructor(private readonly busesService: BusesService) {}

  @Get('search')
  searchBuses(
    @Query('origin') origin: string,
    @Query('destination') destination: string,
    @Query('date') date: string,
  ) {
    return this.busesService.searchPublicBuses({ origin, destination, date });
  }

  @Get('schedules/:id/seat-matrix')
  getSeatMatrix(@Param('id') scheduleId: string) {
    return this.busesService.getSeatMatrix(scheduleId);
  }

  @Post('bookings/lock')
  lockSeats(@Body() data: any) {
    return this.busesService.lockSeats(data);
  }
}
