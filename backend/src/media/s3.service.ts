import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
       private s3: AWS.S3;
       private bucketName: string;

       constructor(private configService: ConfigService) {
              this.s3 = new AWS.S3({
                     accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID')!,
                     secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY')!,
                     region: this.configService.get<string>('AWS_REGION')!,
              });
              this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME')!;
       }

       async uploadFile(file: Express.Multer.File): Promise<string> {
              if (!file) {
                     console.error('S3 Upload: No file provided');
                     throw new InternalServerErrorException('No file provided for upload');
              }

              const { originalname, buffer, mimetype } = file;
              if (!originalname || !buffer) {
                     console.error('S3 Upload: Invalid file object', { originalname: !!originalname, buffer: !!buffer });
                     throw new InternalServerErrorException('Invalid file object for upload');
              }

              const fileExtension = originalname.split('.').pop() || 'tmp';
              const fileName = `${uuidv4()}.${fileExtension}`;

              console.log(`Uploading to S3: ${fileName} (${mimetype}) to bucket ${this.bucketName}`);

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
                     console.error('S3 Upload Error Details:', error);
                     throw new InternalServerErrorException(`Failed to upload file to S3: ${error.message}`);
              }
       }

       async deleteFile(fileUrl: string): Promise<void> {
              try {
                     const key = fileUrl.split('/').pop();
                     if (!key) return;

                     const params: AWS.S3.DeleteObjectRequest = {
                            Bucket: this.bucketName,
                            Key: key,
                     };
                     await this.s3.deleteObject(params).promise();
              } catch (error) {
                     console.error('S3 Delete Error:', error);
              }
       }

       async generatePresignedUrl(key: string): Promise<string> {
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
