import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class createQuestionDto {
  @IsString({ message: 'عنوان السؤال يجب أن يكون نصًا' })
  @IsNotEmpty({ message: 'عنوان السؤال مطلوب' })
  @MinLength(7, { message: 'عنوان السؤال يجب أن لا يقل عن 7 أحرف' })
  @MaxLength(120, { message: 'عنوان السؤال يجب أن لا يتجاوز 120 حرفًا' })
  title: string;

  @IsString({ message: 'العنوان الفرعي يجب أن يكون نصًا' })
  @IsNotEmpty({ message: 'العنوان الفرعي مطلوب' })
  @MinLength(7, { message: 'العنوان الفرعي يجب أن لا يقل عن 7 أحرف' })
  @MaxLength(255, { message: 'العنوان الفرعي يجب أن لا يتجاوز 255 حرفًا' })
  headline: string;

  @IsString({ message: 'محتوى السؤال يجب أن يكون نصًا' })
  @IsNotEmpty({ message: 'محتوى السؤال مطلوب' })
  content: string;
}
