import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from './entities/media.entity';
import { S3Service } from './s3.service';

@Injectable()
export class MediaService {
       constructor(
              @InjectRepository(Media)
              private mediaRepository: Repository<Media>,
              private s3Service: S3Service,
       ) { }

       async findAll(criteria: { hotelId?: string; tourPartnerId?: string; packageId?: string }) {
              const mediaList = await this.mediaRepository.find({ 
                     where: criteria, 
                     order: { createdAt: 'DESC' } 
              });
              return Promise.all(
                     mediaList.map(async (media) => {
                            const key = media.url.split('/').pop();
                            if (key && !media.url.includes('localhost') && media.url.includes('s3')) {
                                   const presigned = await this.s3Service.generatePresignedUrl(key);
                                   if (presigned) {
                                          media.url = presigned;
                                   }
                            }
                            return media;
                     }),
              );
       }

       async uploadAndCreate(data: { hotelId?: string; tourPartnerId?: string; packageId?: string; file: Express.Multer.File; category?: string }) {
              const url = await this.s3Service.uploadFile(data.file);
              const media = this.mediaRepository.create({
                     hotelId: data.hotelId,
                     tourPartnerId: data.tourPartnerId,
                     packageId: data.packageId,
                     name: data.file.originalname,
                     url,
                     category: data.category || 'General',
                     size: `${(data.file.size / 1024 / 1024).toFixed(2)} MB`,
              });
              const savedMedia = await this.mediaRepository.save(media);
              const key = url.split('/').pop();
              if (key && url.includes('s3')) {
                     const presigned = await this.s3Service.generatePresignedUrl(key);
                     if (presigned) {
                            savedMedia.url = presigned;
                     }
              }
              return savedMedia;
       }

       async create(data: { hotelId?: string; tourPartnerId?: string; packageId?: string; name: string; url: string; category?: string; size?: string }) {
              const media = this.mediaRepository.create(data);
              return this.mediaRepository.save(media);
       }

       async remove(id: string) {
              const media = await this.mediaRepository.findOne({ where: { id } });
              if (!media) throw new NotFoundException('Media not found');

              await this.s3Service.deleteFile(media.url);
              await this.mediaRepository.delete(id);
              return { message: 'Media deleted' };
       }
}
