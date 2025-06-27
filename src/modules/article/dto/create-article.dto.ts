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
  @IsString({ message: 'عنوان المقال يجب أن يكون نصًا' })
  @IsNotEmpty({ message: 'عنوان المقال مطلوب' })
  title: string;

  @IsString({ message: 'العنوان الفرعي يجب أن يكون نصًا' })
  @IsNotEmpty({ message: 'العنوان الفرعي مطلوب' })
  headline: string;

  @IsOptional()
  @IsString({ message: 'رابط الصورة يجب أن يكون نصًا' })
  image?: string;

  @IsString({ message: 'محتوى المقال يجب أن يكون نصًا' })
  @IsNotEmpty({ message: 'محتوى المقال مطلوب' })
  @MinLength(7, { message: 'محتوى المقال يجب أن لا يقل عن 7 أحرف' })
  content: string;

  @Transform(({ value }) => {
    const val = parseInt(value, 10);
    return isNaN(val) ? value : val;
  })
  @IsNumber({}, { message: 'معرّف التصنيف يجب أن يكون رقمًا' })
  @IsNotEmpty({ message: 'معرّف التصنيف مطلوب' })
  categoryId: number;
}
