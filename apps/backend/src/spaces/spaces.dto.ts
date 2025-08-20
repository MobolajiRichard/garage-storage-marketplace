import {
  IsString,
  IsOptional,
  IsNumber,
  IsPositive,
  ValidateNested,
  IsUUID,
  IsArray,
  IsEnum,
  IsDateString,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  address: string;

  @IsString()
  zipCode: string;
}

export class CreateSpaceDto {
  @IsString()
  hostId: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  images: string[]

  @IsArray()
  categories: string[]

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsString()
  currency: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}

enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

enum BookingPaymentType {
  CARD = 'CARD',
  CASH = 'CASH'
}


export class CreateBookingDto {
  @IsString()
  spaceId: string;

  @IsString()
  hostId: string;

  @IsString()
  customerId: string;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsEnum(BookingPaymentType)
  paymentType?: BookingPaymentType;

  @IsDateString()
  startAt: string;

  @IsDateString()
  endAt: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsString()
  currency?: string; 

}


export class CreateSpaceReviewDto {
  @IsString()
  spaceId: string;

  @IsString()
  userId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  review: string;

}