import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class UpdateInventoryDto {
  @IsString()
  @IsNotEmpty()
  roomTypeId: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumber()
  totalRooms: number;

  @IsOptional()
  @IsNumber()
  priceOverride?: number;
}
