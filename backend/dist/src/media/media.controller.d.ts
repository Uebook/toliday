import { MediaService } from './media.service';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    findAll(req: any, hotelId?: string, packageId?: string): Promise<import("./entities/media.entity").Media[]>;
    create(req: any, file: Express.Multer.File, hotelId?: string, packageId?: string, category?: string): Promise<import("./entities/media.entity").Media>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
