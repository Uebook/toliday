import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class SignUpDto {
       @IsString()
       name: string;

       @IsEmail()
       email: string;

       @IsString()
       @MinLength(6, { message: 'Password must be at least 6 characters long' })
       password: string;

       @IsString()
       @IsOptional()
       hotelName?: string;

       @IsString()
       @IsOptional()
       partnerType?: string; // HOTEL, SITESEEING, PACKAGES

       @IsOptional()
       @IsString()
       tourismLicenseNumber?: string;

       @IsOptional()
       @IsString()
       registrationNumber?: string;

       @IsOptional()
       @IsString()
       website?: string;

       @IsOptional()
       @IsString()
       yearsInOperation?: string;

       @IsOptional()
       @IsString()
       operatingArea?: string;

       @IsString()
       contactNumber: string;

       // Additional Profile Fields
       @IsOptional()
       @IsString()
       ownerFirstName?: string;

       @IsOptional()
       @IsString()
       ownerLastName?: string;

       @IsOptional()
       @IsString()
       ownerPhone?: string;

       @IsOptional()
       @IsString()
       businessName?: string;

       @IsOptional()
       @IsString()
       businessType?: string;

       @IsOptional()
       @IsString()
       city?: string;

       // Bank Details
       @IsOptional()
       @IsString()
       bankHolder?: string;

       @IsOptional()
       @IsString()
       bankName?: string;

       @IsOptional()
       @IsString()
       bankAccount?: string;

       @IsOptional()
       @IsString()
       bankIfsc?: string;

       // Documents/ID
       @IsOptional()
       @IsString()
       gstNumber?: string;

       @IsOptional()
       @IsString()
       panNumber?: string;

       @IsOptional()
       @IsString()
       gstDoc?: string;

       @IsOptional()
       @IsString()
       panDoc?: string;

       @IsOptional()
       @IsString()
       licenseDoc?: string;
}
