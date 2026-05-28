"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const AWS = __importStar(require("aws-sdk"));
const uuid_1 = require("uuid");
const fs = __importStar(require("fs"));
const path_1 = require("path");
let S3Service = class S3Service {
    configService;
    s3 = null;
    bucketName = null;
    constructor(configService) {
        this.configService = configService;
        const accessKeyId = this.configService.get('AWS_ACCESS_KEY_ID');
        const secretAccessKey = this.configService.get('AWS_SECRET_ACCESS_KEY');
        const region = this.configService.get('AWS_REGION');
        const bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
        if (accessKeyId && secretAccessKey && region && bucketName) {
            this.s3 = new AWS.S3({
                accessKeyId,
                secretAccessKey,
                region,
            });
            this.bucketName = bucketName;
            console.log('S3 Service initialized successfully.');
        }
        else {
            console.warn('AWS S3 configurations are incomplete. Media service will fall back to local disk storage.');
        }
    }
    async uploadFile(file, baseUrl) {
        if (!file) {
            console.error('S3 Upload: No file provided');
            throw new common_1.InternalServerErrorException('No file provided for upload');
        }
        const { originalname, buffer, mimetype } = file;
        if (!originalname || !buffer) {
            console.error('S3 Upload: Invalid file object');
            throw new common_1.InternalServerErrorException('Invalid file object for upload');
        }
        const fileExtension = originalname.split('.').pop() || 'tmp';
        const fileName = `${(0, uuid_1.v4)()}.${fileExtension}`;
        if (this.s3 && this.bucketName) {
            console.log(`Uploading to S3: ${fileName} (${mimetype}) to bucket ${this.bucketName}`);
            const params = {
                Bucket: this.bucketName,
                Key: fileName,
                Body: buffer,
                ContentType: mimetype,
            };
            try {
                const uploadResult = await this.s3.upload(params).promise();
                console.log('S3 Upload Success:', uploadResult.Location);
                return uploadResult.Location;
            }
            catch (error) {
                console.warn('S3 Upload failed. Falling back to local storage...', error.message);
            }
        }
        try {
            const uploadDir = (0, path_1.join)(process.cwd(), 'uploads');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const filePath = (0, path_1.join)(uploadDir, fileName);
            fs.writeFileSync(filePath, buffer);
            console.log(`Local Upload Success: Saved to ${filePath}`);
            const resolvedBaseUrl = baseUrl || 'http://localhost:3001';
            return `${resolvedBaseUrl}/uploads/${fileName}`;
        }
        catch (localError) {
            console.error('Local File Save Error:', localError);
            throw new common_1.InternalServerErrorException(`Upload failed completely: ${localError.message}`);
        }
    }
    async deleteFile(fileUrl) {
        try {
            const key = fileUrl.split('/').pop();
            if (!key)
                return;
            if (fileUrl.includes('/uploads/')) {
                const filePath = (0, path_1.join)(process.cwd(), 'uploads', key);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log(`Local File Deleted: ${filePath}`);
                }
                return;
            }
            if (this.s3 && this.bucketName) {
                const params = {
                    Bucket: this.bucketName,
                    Key: key,
                };
                await this.s3.deleteObject(params).promise();
                console.log(`S3 File Deleted: ${key}`);
            }
        }
        catch (error) {
            console.error('File Delete Error:', error);
        }
    }
    async generatePresignedUrl(key) {
        if (!this.s3 || !this.bucketName) {
            return '';
        }
        try {
            const params = {
                Bucket: this.bucketName,
                Key: key,
                Expires: 3600,
            };
            return await this.s3.getSignedUrlPromise('getObject', params);
        }
        catch (error) {
            console.error('S3 Presign Error:', error);
            return '';
        }
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3Service);
//# sourceMappingURL=s3.service.js.map