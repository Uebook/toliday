import { Repository } from 'typeorm';
import { Media } from './entities/media.entity';
import { S3Service } from './s3.service';
export declare class MediaService {
    private mediaRepository;
    private s3Service;
    constructor(mediaRepository: Repository<Media>, s3Service: S3Service);
    findAll(criteria: {
        hotelId?: string;
        tourPartnerId?: string;
        packageId?: string;
    }): Promise<Media[]>;
    uploadAndCreate(data: {
        hotelId?: string;
        tourPartnerId?: string;
        packageId?: string;
        file: Express.Multer.File;
        category?: string;
        baseUrl?: string;
    }): Promise<Media>;
    create(data: {
        hotelId?: string;
        tourPartnerId?: string;
        packageId?: string;
        name: string;
        url: string;
        category?: string;
        size?: string;
    }): Promise<Media>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
