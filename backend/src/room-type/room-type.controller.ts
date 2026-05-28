import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { RoomTypeService } from './room-type.service';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('room-types')
export class RoomTypeController {
  constructor(private readonly roomTypeService: RoomTypeService) {}

  @Post()
  create(@Request() req, @Body() createDto: CreateRoomTypeDto) {
    const hotelId = req.user.hotelId;
    return this.roomTypeService.create(hotelId, createDto);
  }

  @Get()
  findAll(@Request() req) {
    const hotelId = req.user.hotelId;
    return this.roomTypeService.findAllByHotel(hotelId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    const hotelId = req.user.hotelId;
    return this.roomTypeService.findOne(id, hotelId);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    const hotelId = req.user.hotelId;
    return this.roomTypeService.remove(id, hotelId);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() body: any) {
    const hotelId = req.user.hotelId;
    return this.roomTypeService.update(id, hotelId, body);
  }
}
