import {
  IsString,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsInt,
  Min,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

class UpdateAnswerDto {
  @IsString()
  @MaxLength(255)
  text: string;

  @IsBoolean()
  isCorrect: boolean;
}

export class UpdateQuizQuestionDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAnswerDto)
  answers: UpdateAnswerDto[];
}
