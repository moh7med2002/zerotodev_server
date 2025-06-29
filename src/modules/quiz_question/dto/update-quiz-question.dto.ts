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
  @IsString({ message: 'نص الإجابة يجب أن يكون نصًا' })
  @MaxLength(255, { message: 'نص الإجابة يجب ألا يتجاوز 255 حرفًا' })
  text: string;

  @IsBoolean({ message: 'حقل تحديد الإجابة الصحيحة يجب أن يكون صحيحًا أو خطأ' })
  isCorrect: boolean;
}

export class UpdateQuizQuestionDto {
  @IsString({ message: 'عنوان السؤال يجب أن يكون نصًا' })
  @MaxLength(255, { message: 'عنوان السؤال يجب ألا يتجاوز 255 حرفًا' })
  title: string;

  @IsArray({ message: 'الإجابات يجب أن تكون في شكل قائمة' })
  @ValidateNested({ each: true, message: 'كل إجابة يجب أن تكون كائنًا صالحًا' })
  @Type(() => UpdateAnswerDto)
  answers: UpdateAnswerDto[];
}
