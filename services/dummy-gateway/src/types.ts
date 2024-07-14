import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAccessKeyDto {
  @IsNumber()
  @IsNotEmpty()
  expiresAfter: number;

  @IsNumber()
  @IsNotEmpty()
  rateLimit: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class UpdateAccessKeyDto extends PartialType(CreateAccessKeyDto) {
  _id: string;
}
