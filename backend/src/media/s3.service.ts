import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class S3Service {
  constructor(private configService: ConfigService) {}

  async uploadFile(
    file: Express.Multer.File,
    baseUrl?: string,
  ): Promise<string> {
    if (!file) {
      console.error('Upload: No file provided');
      throw new InternalServerErrorException('No file provided for upload');
    }

    const { originalname, buffer } = file;
    if (!originalname || !buffer) {
      console.error('Upload: Invalid file object');
      throw new InternalServerErrorException('Invalid file object for upload');
    }

    const fileExtension = originalname.split('.').pop() || 'tmp';
    const fileName = `${uuidv4()}.${fileExtension}`;

    // Local Storage
    try {
      const uploadDir = join(__dirname, '..', '..', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);
      console.log(`Local Upload Success: Saved to ${filePath}`);

      const resolvedBaseUrl = baseUrl || this.configService.get<string>('BACKEND_URL') || 'https://localhost:3001';
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

      const filePath = join(__dirname, '..', '..', 'uploads', key);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Local File Deleted: ${filePath}`);
      }
    } catch (error) {
      console.error('File Delete Error:', error);
    }
  }

  async generatePresignedUrl(key: string): Promise<string> {
    return '';
  }
}
