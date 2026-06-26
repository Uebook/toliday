import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StaffService } from './staff.service';

@Controller('staff')
@UseGuards(JwtAuthGuard)
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get()
  findAll(@Request() req, @Query('hotelId') hotelId: string) {
    if (req.user.tourPartnerId) {
      return this.staffService.findAll('', req.user.tourPartnerId);
    }
    if (req.user.busVendorId) {
      return this.staffService.findAll('', '', req.user.busVendorId);
    }
    if (req.user.cabVendorId) {
      return this.staffService.findAll('', '', '', req.user.cabVendorId);
    }
    return this.staffService.findAll(hotelId || req.user.hotelId);
  }

  @Get('attendance/all')
  getAttendance(@Request() req) {
    return this.staffService.getAttendance(req.user.hotelId);
  }

  @Post('attendance/clock')
  clockInOut(
    @Request() req,
    @Body('staffId') staffId: string,
    @Body('action') action: 'IN' | 'OUT',
  ) {
    return this.staffService.clockInOut(req.user.hotelId, staffId, action);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(id);
  }

  @Post()
  create(@Request() req, @Body() body: any) {
    console.log('[DEBUG] StaffController.create Request:', {
      user: req.user,
      body,
    });
    if (req.user.tourPartnerId) {
      return this.staffService.create(req.user.tourPartnerId, 'tour', body);
    }
    if (req.user.busVendorId) {
      return this.staffService.create(req.user.busVendorId, 'bus', body);
    }
    if (req.user.cabVendorId) {
      return this.staffService.create(req.user.cabVendorId, 'cab', body);
    }
    const { hotelId, ...rest } = body;
    return this.staffService.create(hotelId || req.user.hotelId, 'hotel', rest);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.staffService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffService.remove(id);
  }

  @Patch(':id/reset-password')
  resetPassword(@Param('id') id: string, @Body('password') password: string) {
    return this.staffService.resetPassword(id, password);
  }
}
