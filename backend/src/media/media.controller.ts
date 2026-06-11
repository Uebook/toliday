import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MediaService } from './media.service';

@Controller('media')
@UseGuards(JwtAuthGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  findAll(
    @Req() req: any,
    @Query('hotelId') hotelId?: string,
    @Query('packageId') packageId?: string,
  ) {
    const criteria: any = {};
    if (hotelId) criteria.hotelId = hotelId;
    if (packageId) criteria.packageId = packageId;

    // Restrict to their media based on user's vendor type
    if (req.user.tourPartnerId) {
      criteria.tourPartnerId = req.user.tourPartnerId;
    } else if (req.user.busVendorId) {
      criteria.busVendorId = req.user.busVendorId;
    } else if (req.user.cabVendorId) {
      criteria.cabVendorId = req.user.cabVendorId;
    } else if (req.user.hotelId) {
      criteria.hotelId = req.user.hotelId;
    }

    return this.mediaService.findAll(criteria);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Body('hotelId') hotelId?: string,
    @Body('packageId') packageId?: string,
    @Body('category') category?: string,
  ) {
    const protocol = req.protocol || 'http';
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}`;

    return this.mediaService.uploadAndCreate({
      file,
      hotelId: hotelId || req.user.hotelId,
      packageId,
      tourPartnerId: req.user.tourPartnerId,
      busVendorId: req.user.busVendorId,
      cabVendorId: req.user.cabVendorId,
      category,
      baseUrl,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }
}
