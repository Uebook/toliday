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
import { HousekeepingService } from './housekeeping.service';
import { HousekeepingStatus } from './entities/housekeeping.entity';

@UseGuards(JwtAuthGuard)
@Controller('housekeeping')
export class HousekeepingController {
  constructor(private readonly housekeepingService: HousekeepingService) {}

  @Get()
  findAll(@Request() req) {
    const hotelId = req.user.hotelId;
    return this.housekeepingService.findAll(hotelId);
  }

  @Post()
  create(
    @Request() req,
    @Body()
    body: {
      roomNumber: string;
      roomTypeId: string;
      status?: HousekeepingStatus;
      assignedStaffId?: string;
    },
  ) {
    const hotelId = req.user.hotelId;
    return this.housekeepingService.create(hotelId, body);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body()
    body: {
      status?: HousekeepingStatus;
      assignedStaffId?: string;
      roomNumber?: string;
      roomTypeId?: string;
    },
  ) {
    const hotelId = req.user.hotelId;
    return this.housekeepingService.update(id, hotelId, body);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    const hotelId = req.user.hotelId;
    return this.housekeepingService.remove(id, hotelId);
  }
}
