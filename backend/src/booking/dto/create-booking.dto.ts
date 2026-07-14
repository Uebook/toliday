import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  guestName: string;

  @IsEmail()
  @IsOptional()
  guestEmail?: string;

  @IsString()
  @IsOptional()
  guestContact?: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumber()
  numberOfGuests: number;

  @IsNumber()
  totalAmount: number;

  @IsString()
  @IsOptional()
  gstCompany?: string;

  @IsString()
  @IsOptional()
  gstNumber?: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsNotEmpty()
  roomTypeId: string;
}
