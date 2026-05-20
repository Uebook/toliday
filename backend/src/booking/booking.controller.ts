import { Controller, Post, Get, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingController {
       constructor(private readonly bookingService: BookingService) { }

       @Post()
       create(@Request() req, @Body() createDto: CreateBookingDto) {
              const hotelId = req.user.hotelId;
              return this.bookingService.create(hotelId, createDto);
       }

       @Get()
       findAll(@Request() req) {
              if (req.user.tourPartnerId) {
                     return this.bookingService.findAllForTourPartner(req.user.tourPartnerId);
              }
              return this.bookingService.findAll(req.user.hotelId);
       }

       @Get(':id')
       findOne(@Request() req, @Param('id') id: string) {
              if (req.user.tourPartnerId) {
                     return this.bookingService.findOneForTourPartner(id, req.user.tourPartnerId);
              }
              return this.bookingService.findOne(id, req.user.hotelId);
       }

       @Patch(':id/status')
       updateStatus(
              @Request() req,
              @Param('id') id: string,
              @Body() updateDto: UpdateBookingStatusDto
       ) {
              if (req.user.tourPartnerId) {
                     return this.bookingService.updateStatusForTourPartner(id, req.user.tourPartnerId, updateDto.status);
              }
              return this.bookingService.updateStatus(id, req.user.hotelId, updateDto);
       }
}

