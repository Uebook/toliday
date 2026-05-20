import { Controller, Post, Get, Body, Query, UseGuards, Request } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('inventory')
export class InventoryController {
       constructor(private readonly inventoryService: InventoryService) { }

       @Post('update')
       updateInventory(@Request() req, @Body() updateDto: UpdateInventoryDto) {
              const hotelId = req.user.hotelId;
              return this.inventoryService.bulkUpdate(hotelId, updateDto);
       }

       @Get()
       getInventory(
              @Query('roomTypeId') roomTypeId: string,
              @Query('startDate') startDate: string,
              @Query('endDate') endDate: string
       ) {
              return this.inventoryService.getInventory(roomTypeId, startDate, endDate);
       }
}

