import {
  IsString,
  IsOptional,
  IsNumber,
  IsPositive,
  ValidateNested,
  IsUUID,
  IsArray,
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
