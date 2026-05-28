import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PackagesService } from './packages.service';

@Controller('packages')
@UseGuards(JwtAuthGuard)
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get('profile')
  getProfile(@Req() req: any) {
    return this.packagesService.getProfile(req.user.tourPartnerId);
  }

  @Patch('profile')
  updateProfile(@Req() req: any, @Body() data: any) {
    return this.packagesService.updateProfile(req.user.tourPartnerId, data);
  }

  @Get()
  getAllPackages(@Req() req: any) {
    return this.packagesService.getTourPackages(req.user.tourPartnerId);
  }

  @Get(':id')
  getPackage(@Req() req: any, @Param('id') id: string) {
    return this.packagesService.findOnePackage(id, req.user.tourPartnerId);
  }

  @Post()
  createPackage(@Req() req: any, @Body() data: any) {
    console.log('[DEBUG] PackagesController.createPackage', {
      partnerId: req.user.tourPartnerId,
      data,
    });
    return this.packagesService.createTourPackage(req.user.tourPartnerId, data);
  }

  @Patch(':id')
  updatePackage(@Req() req: any, @Param('id') id: string, @Body() data: any) {
    return this.packagesService.updatePackage(id, req.user.tourPartnerId, data);
  }

  @Delete(':id')
  removePackage(@Req() req: any, @Param('id') id: string) {
    return this.packagesService.removePackage(id, req.user.tourPartnerId);
  }

  @Get('itineraries')
  getItineraries(@Req() req: any) {
    return this.packagesService.getTourPackages(req.user.tourPartnerId);
  }

  @Post('itineraries')
  createItinerary(@Req() req: any, @Body() data: any) {
    return this.packagesService.createTourPackage(req.user.tourPartnerId, data);
  }

  @Get('tours')
  getTours(@Req() req: any) {
    return this.packagesService.getTours(req.user.tourPartnerId);
  }

  @Post('tours')
  createTour(@Req() req: any, @Body() data: any) {
    return this.packagesService.createTour(req.user.tourPartnerId, data);
  }

  @Get('stats/summary')
  getStatsSummary(@Req() req: any) {
    return this.packagesService.getStatsSummary(req.user.tourPartnerId);
  }

  @Get('payments/stats')
  getPaymentStats(@Req() req: any) {
    return this.packagesService.getPaymentStats(req.user.tourPartnerId);
  }

  @Get('payments/transactions')
  getPaymentTransactions(@Req() req: any) {
    return this.packagesService.getPaymentTransactions(req.user.tourPartnerId);
  }

  // Leads CRM
  @Get('leads')
  getLeads(@Req() req: any) {
    return this.packagesService.getLeads(req.user.tourPartnerId);
  }

  @Patch('leads/:id/status')
  updateLeadStatus(@Param('id') id: string, @Body('status') status: any) {
    return this.packagesService.updateLeadStatus(id, status);
  }

  // Advanced Itinerary
  @Get(':id/itinerary')
  getItinerary(@Param('id') id: string) {
    return this.packagesService.getItinerary(id);
  }

  @Post(':id/itinerary')
  saveItinerary(@Param('id') id: string, @Body() activities: any[]) {
    return this.packagesService.saveItinerary(id, activities);
  }

  // Tiers
  @Get(':id/tiers')
  getTiers(@Param('id') id: string) {
    return this.packagesService.getTiers(id);
  }

  @Post(':id/tiers')
  saveTiers(@Param('id') id: string, @Body() tiers: any[]) {
    return this.packagesService.saveTiers(id, tiers);
  }

  // Departures
  @Get(':id/departures')
  getDepartures(@Param('id') id: string) {
    return this.packagesService.getDepartures(id);
  }

  @Post(':id/departures')
  saveDepartures(@Param('id') id: string, @Body() departures: any[]) {
    return this.packagesService.saveDepartures(id, departures);
  }
}
