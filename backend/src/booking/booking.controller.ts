import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// Public endpoint — no auth guard needed
@Controller('public/bookings')
export class PublicBookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  createPublic(@Body() body: CreateBookingDto & { hotelId: string }) {
    return this.bookingService.createPublic(body);
  }

  @Get(':email')
  findAllByEmail(@Param('email') email: string) {
    return this.bookingService.findAllByEmail(email);
  }
}

@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Request() req, @Body() createDto: CreateBookingDto) {
    const hotelId = req.user.hotelId;
    return this.bookingService.create(hotelId, createDto);
  }

  @Get('admin/all')
  findAllGlobal(@Request() req) {
    if (req.user.role !== 'ADMIN' && req.user.role !== 'OWNER' && req.user.role !== 'superadmin') {
      throw new ForbiddenException('Unauthorized');
    }
    return this.bookingService.findAllGlobal();
  }

  @Get('admin/:id')
  findOneGlobal(@Request() req, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN' && req.user.role !== 'OWNER' && req.user.role !== 'superadmin') {
      throw new ForbiddenException('Unauthorized');
    }
    return this.bookingService.findOne(id);
  }

  @Patch('admin/:id/status')
  updateStatusGlobal(
    @Request() req,
    @Param('id') id: string,
    @Body() updateDto: UpdateBookingStatusDto,
  ) {
    if (req.user.role !== 'ADMIN' && req.user.role !== 'OWNER' && req.user.role !== 'superadmin') {
      throw new ForbiddenException('Unauthorized');
    }
    return this.bookingService.updateStatus(id, undefined, updateDto);
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
      return this.bookingService.findOneForTourPartner(
        id,
        req.user.tourPartnerId,
      );
    }
    return this.bookingService.findOne(id, req.user.hotelId);
  }

  @Patch(':id/status')
  updateStatus(
    @Request() req,
    @Param('id') id: string,
    @Body() updateDto: UpdateBookingStatusDto,
  ) {
    if (req.user.tourPartnerId) {
      return this.bookingService.updateStatusForTourPartner(
        id,
        req.user.tourPartnerId,
        updateDto.status,
      );
    }
    return this.bookingService.updateStatus(id, req.user.hotelId, updateDto);
  }

  @Patch(':id/assign-room')
  assignRoom(
    @Request() req,
    @Param('id') id: string,
    @Body('roomId') roomId: string,
  ) {
    return this.bookingService.assignRoom(id, req.user.hotelId, roomId);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() body: any,
  ) {
    if (req.user.tourPartnerId) {
      throw new ForbiddenException('Not supported for tour partners');
    }
    return this.bookingService.update(id, req.user.hotelId, body);
  }

  @Get('admin/consumers')
  getAdminConsumers(@Request() req) {
    if (req.user.role !== 'ADMIN' && req.user.role !== 'OWNER' && req.user.role !== 'superadmin') {
      throw new ForbiddenException('Unauthorized');
    }
    return this.bookingService.getAdminConsumers();
  }

}
