import {
  IsString,
  IsOptional,
  IsUrl,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PartialPositionDto {
  @IsOptional()
  x?: number;

  @IsOptional()
  y?: number;
}

class PartialSizeDto {
  @IsOptional()
  width?: number;

  @IsOptional()
  height?: number;
}

export class UpdateEntryDto {
  @IsString()
  @IsOptional()
  content?: string;

  @IsUrl()
  @IsOptional()
  url?: string;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => PartialPositionDto)
  position?: PartialPositionDto;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => PartialSizeDto)
  size?: PartialSizeDto;
}
