import { IsString, IsEmail, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateBookingDto {
       @IsString()
       @IsNotEmpty()
       guestName: string;

       @IsEmail()
       guestEmail: string;

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
       @IsNotEmpty()
       roomTypeId: string;
}
