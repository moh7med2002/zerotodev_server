// create-quiz.dto.ts
import {
  IsInt,
  IsString,
  IsArray,
  ValidateNested,
  Min,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateQuestionDto {
  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  answers: string[];

  @IsInt()
  @Min(0)
  correctAnswer: number;
}

export class CreateQuizWithQuestionsDto {
  @IsString()
  quizId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
