import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class S3Service {
  private s3: AWS.S3 | null = null;
  private bucketName: string | null = null;

  constructor(private configService: ConfigService) {
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );
    const region = this.configService.get<string>('AWS_REGION');
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');

    if (accessKeyId && secretAccessKey && region && bucketName) {
      this.s3 = new AWS.S3({
        accessKeyId,
        secretAccessKey,
        region,
        signatureVersion: 'v4',
      });
      this.bucketName = bucketName;
      console.log('S3 Service initialized successfully.');
    } else {
      console.warn(
        'AWS S3 configurations are incomplete. Media service will fall back to local disk storage.',
      );
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    baseUrl?: string,
  ): Promise<string> {
    if (!file) {
      console.error('S3 Upload: No file provided');
      throw new InternalServerErrorException('No file provided for upload');
    }

    const { originalname, buffer, mimetype } = file;
    if (!originalname || !buffer) {
      console.error('S3 Upload: Invalid file object');
      throw new InternalServerErrorException('Invalid file object for upload');
    }

    const fileExtension = originalname.split('.').pop() || 'tmp';
    const fileName = `${uuidv4()}.${fileExtension}`;

    // Attempt S3 upload if configured
    if (this.s3 && this.bucketName) {
      console.log(
        `Uploading to S3: ${fileName} (${mimetype}) to bucket ${this.bucketName}`,
      );
      const params: AWS.S3.PutObjectRequest = {
        Bucket: this.bucketName,
        Key: fileName,
        Body: buffer,
        ContentType: mimetype,
      };

      try {
        const uploadResult = await this.s3.upload(params).promise();
        console.log('S3 Upload Success:', uploadResult.Location);
        return uploadResult.Location;
      } catch (error) {
        console.warn(
          'S3 Upload failed. Falling back to local storage...',
          error.message,
        );
      }
    }

    // Local Fallback: Write file to `./uploads/` directory
    try {
      const uploadDir = join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);
      console.log(`Local Upload Success: Saved to ${filePath}`);

      const resolvedBaseUrl = baseUrl || 'http://localhost:3001';
      return `${resolvedBaseUrl}/uploads/${fileName}`;
    } catch (localError) {
      console.error('Local File Save Error:', localError);
      throw new InternalServerErrorException(
        `Upload failed completely: ${localError.message}`,
      );
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const key = fileUrl.split('/').pop();
      if (!key) return;

      // If it's a local file, delete it from local disk
      if (fileUrl.includes('/uploads/')) {
        const filePath = join(process.cwd(), 'uploads', key);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`Local File Deleted: ${filePath}`);
        }
        return;
      }

      // Otherwise, delete from S3
      if (this.s3 && this.bucketName) {
        const params: AWS.S3.DeleteObjectRequest = {
          Bucket: this.bucketName,
          Key: key,
        };
        await this.s3.deleteObject(params).promise();
        console.log(`S3 File Deleted: ${key}`);
      }
    } catch (error) {
      console.error('File Delete Error:', error);
    }
  }

  async generatePresignedUrl(key: string): Promise<string> {
    if (!this.s3 || !this.bucketName) {
      // Local server does not need presigned URLs
      return '';
    }
    try {
      const params = {
        Bucket: this.bucketName,
        Key: key,
        Expires: 3600, // 1 hour
      };
      return await this.s3.getSignedUrlPromise('getObject', params);
    } catch (error) {
      console.error('S3 Presign Error:', error);
      return '';
    }
  }
}
