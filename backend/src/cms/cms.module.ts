import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';
import { CmsHero, CmsPromo, CmsDestination, CmsBlog, CmsPolicy } from './entities/cms.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CmsHero, CmsPromo, CmsDestination, CmsBlog, CmsPolicy]),
  ],
  controllers: [CmsController],
  providers: [CmsService],
  exports: [CmsService],
})
export class CmsModule {}
