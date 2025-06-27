import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class SubmitQuizDto {
  @IsArray({ message: 'الإجابات يجب أن تكون في شكل قائمة' })
  @ArrayNotEmpty({ message: 'يجب إدخال إجابات للاختبار' })
  answers: number[];

  @IsNotEmpty({ message: 'معرّف الاختبار مطلوب' })
  @IsNumber({}, { message: 'معرّف الاختبار يجب أن يكون رقمًا' })
  quizId: number;
}
