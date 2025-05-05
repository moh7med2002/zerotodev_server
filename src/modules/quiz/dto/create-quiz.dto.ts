import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class createQuizDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(120)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  headline: string;
}
