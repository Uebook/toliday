import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { HotelStatus } from '../hotel/entities/hotel.entity';
import { PartnerStatus as TourPartnerStatus } from '../packages/entities/tour-partner.entity';
import { BusVendorStatus } from '../buses/entities/bus-vendor.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RoleGuard)
@Roles('ADMIN', 'superadmin', 'OWNER')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  getStats(@Query('period') period: string) {
    return this.adminService.getDashboardStats(period);
  }

  @Post('finance/settle')
  processSettlements() {
    return this.adminService.processSettlements();
  }

  @Patch('promotions/:id/verify')
  updatePromotionStatus(
    @Param('id') id: string,
    @Body('isVerified') isVerified: boolean,
  ) {
    return this.adminService.updatePromotionStatus(id, isVerified);
  }

  // Hotels
  @Get('hotels')
  findAllHotels(@Query('status') status?: HotelStatus) {
    return this.adminService.findAllHotels(status);
  }

  @Get('hotels/:id')
  findHotelById(@Param('id') id: string) {
    return this.adminService.findHotelById(id);
  }

  @Patch('hotels/:id/status')
  updateHotelStatus(
    @Param('id') id: string,
    @Body('status') status: HotelStatus,
  ) {
    return this.adminService.updateHotelStatus(id, status);
  }

  @Patch('hotels/:id')
  updateHotelDetails(
    @Param('id') id: string,
    @Body() data: any,
  ) {
    return this.adminService.updateHotelDetails(id, data);
  }

  @Patch('hotels/rooms/:roomId')
  updateHotelRoom(
    @Param('roomId') roomId: string,
    @Body() data: any,
  ) {
    return this.adminService.updateHotelRoom(roomId, data);
  }

  @Post('hotels')
  createHotel(@Body() data: any) {
    return this.adminService.createHotel(data);
  }

  @Delete('hotels/:id')
  @HttpCode(200)
  deleteHotel(@Param('id') id: string) {
    return this.adminService.deleteHotel(id);
  }

  @Get('hotels/:id/reviews')
  getHotelReviews(@Param('id') id: string) {
    return this.adminService.getHotelReviews(id);
  }

  @Post('hotels/:id/rooms')
  addHotelRoom(@Param('id') hotelId: string, @Body() data: any) {
    return this.adminService.addHotelRoom(hotelId, data);
  }

  @Delete('hotels/rooms/:roomId')
  deleteHotelRoom(@Param('roomId') roomId: string) {
    return this.adminService.deleteHotelRoom(roomId);
  }

  // Tour Partners
  @Get('tour-partners')
  findAllTourPartners(@Query('status') status?: TourPartnerStatus) {
    return this.adminService.findAllTourPartners(status);
  }

  @Get('tour-partners/:id')
  findTourPartnerById(@Param('id') id: string) {
    return this.adminService.findTourPartnerById(id);
  }

  @Patch('tour-partners/:id/status')
  updateTourPartnerStatus(
    @Param('id') id: string,
    @Body('status') status: TourPartnerStatus,
  ) {
    return this.adminService.updateTourPartnerStatus(id, status);
  }

  @Patch('tour-partners/:id')
  updateTourPartnerDetails(
    @Param('id') id: string,
    @Body() data: any,
  ) {
    return this.adminService.updateTourPartnerDetails(id, data);
  }

  @Patch('tour-partners/packages/:packageId')
  updateTourPackage(
    @Param('packageId') packageId: string,
    @Body() data: any,
  ) {
    return this.adminService.updateTourPackage(packageId, data);
  }

  @Post('tour-partners/:id/packages')
  addTourPackage(@Param('id') partnerId: string, @Body() data: any) {
    return this.adminService.addTourPackage(partnerId, data);
  }

  @Delete('tour-partners/packages/:packageId')
  deleteTourPackage(@Param('packageId') packageId: string) {
    return this.adminService.deleteTourPackage(packageId);
  }

  // Bus Vendors
  @Get('buses')
  findAllBusVendors(@Query('status') status?: BusVendorStatus) {
    return this.adminService.findAllBusVendors(status);
  }

  @Get('buses/:id')
  findBusVendorById(@Param('id') id: string) {
    return this.adminService.findBusVendorById(id);
  }

  @Patch('buses/:id/status')
  updateBusVendorStatus(
    @Param('id') id: string,
    @Body('status') status: BusVendorStatus,
  ) {
    return this.adminService.updateBusVendorStatus(id, status);
  }

  @Patch('buses/:id')
  updateBusVendorDetails(
    @Param('id') id: string,
    @Body() data: any,
  ) {
    return this.adminService.updateBusVendorDetails(id, data);
  }

  @Patch('buses/fleet/:busId')
  updateBusFleet(
    @Param('busId') busId: string,
    @Body() data: any,
  ) {
    return this.adminService.updateBusFleet(busId, data);
  }

  @Post('buses/:id/fleet')
  addBusFleet(@Param('id') vendorId: string, @Body() data: any) {
    return this.adminService.addBusFleet(vendorId, data);
  }

  @Delete('buses/fleet/:busId')
  deleteBusFleet(@Param('busId') busId: string) {
    return this.adminService.deleteBusFleet(busId);
  }

  // Cab Vendors
  @Get('cabs')
  findAllCabVendors() {
    return this.adminService.findAllCabVendors();
  }

  @Get('cabs/:id')
  findCabVendorById(@Param('id') id: string) {
    return this.adminService.findCabVendorById(id);
  }

  @Patch('cabs/:id/verify')
  updateCabVendorVerification(
    @Param('id') id: string,
    @Body('isVerified') isVerified: boolean,
  ) {
    return this.adminService.updateCabVendorVerification(id, isVerified);
  }

  @Patch('cabs/:id')
  updateCabVendorDetails(
    @Param('id') id: string,
    @Body() data: any,
  ) {
    return this.adminService.updateCabVendorDetails(id, data);
  }

  @Patch('cabs/vehicles/:vehicleId')
  updateCabVehicle(
    @Param('vehicleId') vehicleId: string,
    @Body() data: any,
  ) {
    return this.adminService.updateCabVehicle(vehicleId, data);
  }

  @Post('cabs/:id/vehicles')
  addCabVehicle(@Param('id') vendorId: string, @Body() data: any) {
    return this.adminService.addCabVehicle(vendorId, data);
  }

  @Delete('cabs/vehicles/:vehicleId')
  deleteCabVehicle(@Param('vehicleId') vehicleId: string) {
    return this.adminService.deleteCabVehicle(vehicleId);
  }

  @Get('bookings')
  findAllBookings() {
    return this.adminService.findAllBookings();
  }

  @Get('users')
  findAllUsers() {
    return this.adminService.findAllUsers();
  }
}
