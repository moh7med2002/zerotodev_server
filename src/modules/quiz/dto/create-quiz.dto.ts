import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class createQuizDto {
  @IsString({ message: 'عنوان الاختبار يجب أن يكون نصًا' })
  @IsNotEmpty({ message: 'عنوان الاختبار مطلوب' })
  @MinLength(3, { message: 'عنوان الاختبار يجب أن لا يقل عن 3 أحرف' })
  @MaxLength(120, { message: 'عنوان الاختبار يجب أن لا يتجاوز 120 حرفًا' })
  title: string;

  @IsString({ message: 'العنوان الفرعي يجب أن يكون نصًا' })
  @IsNotEmpty({ message: 'العنوان الفرعي مطلوب' })
  @MinLength(5, { message: 'العنوان الفرعي يجب أن لا يقل عن 5 أحرف' })
  @MaxLength(255, { message: 'العنوان الفرعي يجب أن لا يتجاوز 255 حرفًا' })
  headline: string;
}
