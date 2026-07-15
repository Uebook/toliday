global.crypto = require("crypto");

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

export async function createApp() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const allowedOrigins = [
    'http://portal.tolidaytrip.com',
    'https://portal.tolidaytrip.com',
    'http://tolidaytrip.com',
    'https://tolidaytrip.com',
    'http://www.tolidaytrip.com',
    'https://www.tolidaytrip.com',
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3001',
    'http://localhost:3002',
    'http://localhost:5173',
  ];
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  // Serve uploads folder statically
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  return app;
}

async function bootstrap() {
  const app = await createApp();
  await app.listen(process.env.PORT ?? 3001);
}

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  bootstrap();
}
