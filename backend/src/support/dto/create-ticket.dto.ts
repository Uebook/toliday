import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { TicketPriority } from '../entities/support-ticket.entity';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsEnum(TicketPriority)
  @IsNotEmpty()
  priority: TicketPriority;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
