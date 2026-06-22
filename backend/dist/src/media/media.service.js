"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const media_entity_1 = require("./entities/media.entity");
const s3_service_1 = require("./s3.service");
let MediaService = class MediaService {
    mediaRepository;
    s3Service;
    constructor(mediaRepository, s3Service) {
        this.mediaRepository = mediaRepository;
        this.s3Service = s3Service;
    }
    async findAll(criteria) {
        const mediaList = await this.mediaRepository.find({
            where: criteria,
            order: { createdAt: 'DESC' },
        });
        return Promise.all(mediaList.map(async (media) => {
            const key = media.url.split('/').pop();
            if (key &&
                !media.url.includes('localhost') &&
                media.url.includes('s3')) {
                const presigned = await this.s3Service.generatePresignedUrl(key);
                if (presigned) {
                    media.url = presigned;
                }
            }
            return media;
        }));
    }
    async uploadAndCreate(data) {
        const url = await this.s3Service.uploadFile(data.file, data.baseUrl);
        const media = this.mediaRepository.create({
            hotelId: data.hotelId,
            tourPartnerId: data.tourPartnerId,
            busVendorId: data.busVendorId,
            cabVendorId: data.cabVendorId,
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
    async create(data) {
        const media = this.mediaRepository.create(data);
        return this.mediaRepository.save(media);
    }
    async remove(id) {
        const media = await this.mediaRepository.findOne({ where: { id } });
        if (!media)
            throw new common_1.NotFoundException('Media not found');
        await this.s3Service.deleteFile(media.url);
        await this.mediaRepository.delete(id);
        return { message: 'Media deleted' };
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(media_entity_1.Media)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        s3_service_1.S3Service])
], MediaService);
//# sourceMappingURL=media.service.js.map