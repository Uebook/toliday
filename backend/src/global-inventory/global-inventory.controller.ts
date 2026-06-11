import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GlobalInventoryService } from './global-inventory.service';
import { VerticalType } from './entities/global-inventory.entity';
import { StaffRole } from '../staff/entities/staff.entity';

@Controller('global-inventory')
@UseGuards(JwtAuthGuard)
export class GlobalInventoryController {
  constructor(private readonly inventoryService: GlobalInventoryService) {}

  private checkAdmin(req: any) {
    if (req.user.role !== StaffRole.ADMIN && req.user.role !== StaffRole.OWNER) {
      throw new UnauthorizedException('Admin access required');
    }
  }

  @Get('admin/all')
  findAll(@Request() req: any, @Query('vertical') vertical?: VerticalType) {
    this.checkAdmin(req);
    return this.inventoryService.findAllAdmin(vertical);
  }

  @Get('admin/vendor/:vendorId')
  findByVendor(
    @Request() req: any, 
    @Param('vendorId') vendorId: string,
    @Query('vertical') vertical?: VerticalType
  ) {
    this.checkAdmin(req);
    return this.inventoryService.findByVendor(vendorId, vertical);
  }

  @Patch('admin/:id')
  updateInventory(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateData: any,
  ) {
    this.checkAdmin(req);
    return this.inventoryService.updateInventory(id, updateData);
  }
}
