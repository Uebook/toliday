import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Request() req, @Body() createRoomDto: CreateRoomDto) {
    // In a real app, verify the roomTypeId belongs to req.user.hotelId
    return this.roomService.create(createRoomDto);
  }

  @Get()
  findAll(@Request() req) {
    const hotelId = req.user.hotelId;
    return this.roomService.findAllByHotel(hotelId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    const hotelId = req.user.hotelId;
    return this.roomService.findOne(id, hotelId);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    const hotelId = req.user.hotelId;
    return this.roomService.update(id, hotelId, updateRoomDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    const hotelId = req.user.hotelId;
    return this.roomService.remove(id, hotelId);
  }
}
