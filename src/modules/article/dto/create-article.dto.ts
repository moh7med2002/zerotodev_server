import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class createArtcileDto {
  @IsString()
  @IsNotEmpty()
  //   @MinLength(7)
  //   @MaxLength(120)
  title: string;

  @IsString()
  @IsNotEmpty()
  //   @MinLength(7)
  //   @MaxLength(255)
  headline: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  content: string;

  @Transform(({ value }) => {
    const val = parseInt(value, 10);
    return isNaN(val) ? value : val;
  })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
