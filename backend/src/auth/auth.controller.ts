import { Controller, Post, Body, HttpCode, HttpStatus, Patch, Request, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../media/s3.service';
import * as fs from 'fs';

@Controller('auth')
export class AuthController {
       constructor(
              private readonly authService: AuthService,
              private readonly s3Service: S3Service
       ) { }

       private logDebug(message: string) {
              const logEntry = `[${new Date().toISOString()}] ${message}\n`;
              try { fs.appendFileSync('signup_debug.log', logEntry); } catch (e) { }
       }

       @Post('signup')
       @UseInterceptors(FileFieldsInterceptor([
              { name: 'gst', maxCount: 1 },
              { name: 'pan', maxCount: 1 },
              { name: 'license', maxCount: 1 },
       ]))
       async signup(
              @Body() signUpDto: SignUpDto,
              @UploadedFiles() files: { gst?: Express.Multer.File[], pan?: Express.Multer.File[], license?: Express.Multer.File[] }
       ) {
              try {
                     this.logDebug(`--- SIGNUP START ---`);
                     this.logDebug(`Files keys: ${Object.keys(files || {})}`);

                     // Upload files if present
                     if (files?.gst?.[0]) {
                            this.logDebug(`Uploading GST...`);
                            signUpDto.gstDoc = await this.s3Service.uploadFile(files.gst[0]);
                            this.logDebug(`GST URL: ${signUpDto.gstDoc}`);
                     }
                     if (files?.pan?.[0]) {
                            this.logDebug(`Uploading PAN...`);
                            signUpDto.panDoc = await this.s3Service.uploadFile(files.pan[0]);
                            this.logDebug(`PAN URL: ${signUpDto.panDoc}`);
                     }
                     if (files?.license?.[0]) {
                            this.logDebug(`Uploading License...`);
                            signUpDto.licenseDoc = await this.s3Service.uploadFile(files.license[0]);
                            this.logDebug(`License URL: ${signUpDto.licenseDoc}`);
                     }

                     this.logDebug(`Calling AuthService.signup for ${signUpDto.email}`);
                     return await this.authService.signup(signUpDto);
              } catch (error) {
                     this.logDebug(`Signup Error: ${error.message}\nStack: ${error.stack}`);
                     console.error('Signup Error:', error);
                     throw error;
              }
       }

       @HttpCode(HttpStatus.OK)
       @Post('login')
       async login(@Body() loginDto: LoginDto) {
              return this.authService.login(loginDto);
       }

       @UseGuards(JwtAuthGuard)
       @Patch('change-password')
       async changePassword(@Request() req, @Body() body: any) {
              return this.authService.changePassword(req.user.id, body.currentPassword, body.newPassword);
       }
}
