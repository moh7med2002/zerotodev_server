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
  @IsString({ message: 'عنوان السؤال يجب أن يكون نصًا' })
  title: string;

  @IsArray({ message: 'الإجابات يجب أن تكون في شكل قائمة' })
  @IsString({ each: true, message: 'كل إجابة يجب أن تكون نصًا' })
  @ArrayMinSize(1, { message: 'يجب إدخال إجابة واحدة على الأقل' })
  answers: string[];

  @IsInt({ message: 'رقم الإجابة الصحيحة يجب أن يكون عددًا صحيحًا' })
  @Min(0, { message: 'رقم الإجابة الصحيحة يجب أن يكون صفرًا أو أكثر' })
  correctAnswer: number;
}

export class CreateQuizWithQuestionsDto {
  @IsString({ message: 'معرّف الاختبار يجب أن يكون نصًا' })
  quizId: string;

  @IsArray({ message: 'الأسئلة يجب أن تكون في شكل قائمة' })
  @ValidateNested({ each: true, message: 'كل سؤال يجب أن يكون كائنًا صالحًا' })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
