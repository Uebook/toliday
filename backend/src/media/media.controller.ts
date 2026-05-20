import {
       Controller, Get, Post, Delete, Param, Body, Query, UseGuards,
       UploadedFile, UseInterceptors, Req
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MediaService } from './media.service';

@Controller('media')
@UseGuards(JwtAuthGuard)
export class MediaController {
       constructor(private readonly mediaService: MediaService) { }

       @Get()
       findAll(
              @Req() req: any,
              @Query('hotelId') hotelId?: string,
              @Query('packageId') packageId?: string,
       ) {
              const criteria: any = {};
              if (hotelId) criteria.hotelId = hotelId;
              if (packageId) criteria.packageId = packageId;
              
              // If tour partner, restrict to their media
              if (req.user.tourPartnerId) {
                     criteria.tourPartnerId = req.user.tourPartnerId;
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
              return this.mediaService.uploadAndCreate({
                     file,
                     hotelId,
                     packageId,
                     tourPartnerId: req.user.tourPartnerId,
                     category,
              });
       }

       @Delete(':id')
       remove(@Param('id') id: string) {
              return this.mediaService.remove(id);
       }
}
