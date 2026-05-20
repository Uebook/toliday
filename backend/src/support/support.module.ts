import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportFaq } from './entities/support-faq.entity';
import { SupportTicket } from './entities/support-ticket.entity';
import { SupportController } from './support.controller';
import { SupportService } from './support.service';

@Module({
       imports: [TypeOrmModule.forFeature([SupportFaq, SupportTicket])],
       controllers: [SupportController],
       providers: [SupportService],
       exports: [SupportService]
})
export class SupportModule { }
