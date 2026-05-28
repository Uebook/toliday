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
import { RatesService } from './rates.service';

@Controller('rates')
@UseGuards(JwtAuthGuard)
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @Get()
  findAll(@Request() req, @Query('hotelId') hotelId: string) {
    if (req.user.tourPartnerId) {
      return this.ratesService.findAllForTourPartner(req.user.tourPartnerId);
    }
    return this.ratesService.findAll(hotelId || req.user.hotelId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    if (req.user.tourPartnerId) {
      return this.ratesService.findOneForTourPartner(
        id,
        req.user.tourPartnerId,
      );
    }
    return this.ratesService.findOne(id);
  }

  @Post()
  create(@Request() req, @Body() body: any) {
    if (req.user.tourPartnerId) {
      return this.ratesService.createForTourPartner(
        req.user.tourPartnerId,
        body,
      );
    }
    const { hotelId, ...rest } = body;
    return this.ratesService.create(hotelId || req.user.hotelId, rest);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.ratesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratesService.remove(id);
  }
}
