import { Controller, Get, Param } from '@nestjs/common';
import { HotelService } from './hotel.service';

@Controller('public/hotels')
export class PublicHotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get()
  findAll() {
    return this.hotelService.findAllPublic();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.hotelService.findByIdPublic(id);
  }
}
