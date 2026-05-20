import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CabsService } from './cabs.service';

@Controller('cabs')
@UseGuards(JwtAuthGuard)
export class CabsController {
    constructor(private readonly cabsService: CabsService) {}

    // Profile
    @Get('profile')
    getProfile(@Request() req: any) {
        return this.cabsService.findVendorById(req.user.cabVendorId);
    }

    @Patch('profile')
    updateProfile(@Request() req: any, @Body() data: any) {
        return this.cabsService.updateVendor(req.user.cabVendorId, data);
    }

    // Fleet (Vehicles)
    @Get('fleet')
    getFleet(@Request() req: any) {
        return this.cabsService.findVehicles(req.user.cabVendorId);
    }

    @Post('fleet')
    createVehicle(@Request() req: any, @Body() data: any) {
        return this.cabsService.createVehicle(req.user.cabVendorId, data);
    }

    @Patch('fleet/:id')
    updateVehicle(@Request() req: any, @Param('id') id: string, @Body() data: any) {
        return this.cabsService.updateVehicle(id, req.user.cabVendorId, data);
    }

    @Delete('fleet/:id')
    deleteVehicle(@Request() req: any, @Param('id') id: string) {
        return this.cabsService.deleteVehicle(id, req.user.cabVendorId);
    }

    // Drivers
    @Get('drivers')
    getDrivers(@Request() req: any) {
        return this.cabsService.findDrivers(req.user.cabVendorId);
    }

    @Post('drivers')
    createDriver(@Request() req: any, @Body() data: any) {
        return this.cabsService.createDriver(req.user.cabVendorId, data);
    }

    @Patch('drivers/:id')
    updateDriver(@Request() req: any, @Param('id') id: string, @Body() data: any) {
        return this.cabsService.updateDriver(id, req.user.cabVendorId, data);
    }

    @Delete('drivers/:id')
    deleteDriver(@Request() req: any, @Param('id') id: string) {
        return this.cabsService.deleteDriver(id, req.user.cabVendorId);
    }

    // Pricing
    @Get('pricing')
    getPricing(@Request() req: any) {
        return this.cabsService.findPricing(req.user.cabVendorId);
    }

    @Post('pricing')
    createPricing(@Request() req: any, @Body() data: any) {
        return this.cabsService.createPricing(req.user.cabVendorId, data);
    }

    @Delete('pricing/:id')
    deletePricing(@Request() req: any, @Param('id') id: string) {
        return this.cabsService.deletePricing(id, req.user.cabVendorId);
    }

    // Bookings
    @Get('bookings')
    getBookings(@Request() req: any) {
        return this.cabsService.findBookings(req.user.cabVendorId);
    }

    @Patch('bookings/:id/status')
    updateBookingStatus(@Request() req: any, @Param('id') id: string, @Body('status') status: any) {
        return this.cabsService.updateBookingStatus(id, req.user.cabVendorId, status);
    }

    // Dashboard Stats
    @Get('stats')
    getStats(@Request() req: any) {
        return this.cabsService.getStats(req.user.cabVendorId);
    }
}
