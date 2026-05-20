import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { BusesService } from './buses.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('buses')
@UseGuards(JwtAuthGuard)
export class BusesController {
  constructor(private readonly busesService: BusesService) {}

  // Profile / Dashboard
  @Get('stats')
  getStats(@Request() req: any) {
    return this.busesService.getStats(req.user.busVendorId);
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    return this.busesService.findVendorById(req.user.busVendorId);
  }

  @Put('profile')
  updateProfile(@Request() req: any, @Body() data: any) {
    return this.busesService.updateVendor(req.user.busVendorId, data);
  }

  // ... (existing endpoints) ...

  // Vendor Endpoints
  @Get('vendors')
  findAllVendors() {
    return this.busesService.findAllVendors();
  }

  @Get('vendors/:id')
  findVendorById(@Param('id') id: string) {
    return this.busesService.findVendorById(id);
  }

  @Post('vendors')
  createVendor(@Body() data: any) {
    return this.busesService.createVendor(data);
  }

  // Bus Endpoints
  @Get('vendors/:vendorId/buses')
  findBusesByVendor(@Param('vendorId') vendorId: string) {
    return this.busesService.findBusesByVendor(vendorId);
  }

  @Post('buses')
  createBus(@Body() data: any) {
    return this.busesService.createBus(data);
  }

  // Route Endpoints
  @Get('routes')
  findAllRoutes() {
    return this.busesService.findAllRoutes();
  }

  @Post('routes')
  createRoute(@Body() data: any) {
    return this.busesService.createRoute(data);
  }

  // Schedule Endpoints
  @Get('routes/:routeId/schedules')
  findSchedulesByRoute(@Param('routeId') routeId: string) {
    return this.busesService.findSchedulesByRoute(routeId);
  }

  @Post('schedules')
  createSchedule(@Body() data: any) {
    return this.busesService.createSchedule(data);
  }

  // Seat Layout Endpoints
  @Get('buses/:busId/layouts')
  findSeatLayout(@Param('busId') busId: string) {
    return this.busesService.findSeatLayout(busId);
  }

  @Post('buses/:busId/layouts')
  saveSeatLayout(@Param('busId') busId: string, @Body() layouts: any[]) {
    return this.busesService.saveSeatLayout(busId, layouts);
  }

  // Crew Endpoints
  @Get('vendors/:vendorId/crew')
  findCrewByVendor(@Param('vendorId') vendorId: string) {
    return this.busesService.findCrewByVendor(vendorId);
  }

  @Post('crew')
  createCrewMember(@Body() data: any) {
    return this.busesService.createCrewMember(data);
  }

  // Booking Endpoints
  @Get('schedules/:scheduleId/bookings')
  findBookingsBySchedule(@Param('scheduleId') scheduleId: string) {
    return this.busesService.findBookingsBySchedule(scheduleId);
  }

  @Post('bookings')
  createBooking(@Body() data: any) {
    return this.busesService.createBooking(data);
  }

  // Yield Management Endpoints
  @Get('buses/:busId/yield-rules')
  findYieldRules(@Param('busId') busId: string) {
    return this.busesService.findYieldRulesByBus(busId);
  }

  @Post('buses/:busId/yield-rules')
  createYieldRule(@Param('busId') busId: string, @Body() data: any) {
    return this.busesService.createYieldRule(busId, data);
  }
}
