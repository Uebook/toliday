import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PromotionsService } from './promotions.service';
import { VerticalType } from '../common/enums/vertical.enum';

@Controller('promotions')
@UseGuards(JwtAuthGuard)
export class PromotionsController {
    constructor(private readonly promotionsService: PromotionsService) {}

    private extractVendorContext(req: any) {
        if (req.user.hotelId) return { vendorId: req.user.hotelId, vertical: VerticalType.HOTEL };
        if (req.user.tourPartnerId) return { vendorId: req.user.tourPartnerId, vertical: VerticalType.PACKAGE };
        if (req.user.busVendorId) return { vendorId: req.user.busVendorId, vertical: VerticalType.BUS };
        if (req.user.cabVendorId) return { vendorId: req.user.cabVendorId, vertical: VerticalType.CAB };
        
        throw new Error('Could not determine vendor vertical');
    }

    @Post()
    create(@Request() req: any, @Body() body: any) {
        const { vendorId, vertical } = this.extractVendorContext(req);
        return this.promotionsService.create(vendorId, vertical, body);
    }

    @Get()
    findAll(@Request() req: any) {
        const { vendorId, vertical } = this.extractVendorContext(req);
        return this.promotionsService.findAllByVendor(vendorId, vertical);
    }

    @Get(':id')
    findOne(@Request() req: any, @Param('id') id: string) {
        const { vendorId } = this.extractVendorContext(req);
        return this.promotionsService.findOne(id, vendorId);
    }

    @Patch(':id')
    update(@Request() req: any, @Param('id') id: string, @Body() body: any) {
        const { vendorId } = this.extractVendorContext(req);
        return this.promotionsService.update(id, vendorId, body);
    }

    @Delete(':id')
    remove(@Request() req: any, @Param('id') id: string) {
        const { vendorId } = this.extractVendorContext(req);
        return this.promotionsService.remove(id, vendorId);
    }
}
