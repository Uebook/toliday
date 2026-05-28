import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TicketStatus } from '../entities/support-ticket.entity';

export class UpdateTicketDto {
  @IsEnum(TicketStatus)
  @IsOptional()
  status?: TicketStatus;

  @IsString()
  @IsOptional()
  adminComment?: string;
}
