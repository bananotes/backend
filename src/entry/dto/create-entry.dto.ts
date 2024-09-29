import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PositionDto {
  @IsNotEmpty()
  x: number;

  @IsNotEmpty()
  y: number;
}

class SizeDto {
  @IsNotEmpty()
  width: number;

  @IsNotEmpty()
  height: number;
}

export class CreateEntryDto {
  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsObject()
  @ValidateNested()
  @Type(() => PositionDto)
  position: PositionDto;

  @IsObject()
  @ValidateNested()
  @Type(() => SizeDto)
  size: SizeDto;
}
