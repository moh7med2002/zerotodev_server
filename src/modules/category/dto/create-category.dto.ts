import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class createCategoryDto {
  @IsString({ message: 'اسم التصنيف يجب أن يكون نصًا' })
  @IsNotEmpty({ message: 'اسم التصنيف مطلوب' })
  @MinLength(3, { message: 'اسم التصنيف يجب أن يحتوي على 3 أحرف على الأقل' })
  @MaxLength(32, { message: 'اسم التصنيف يجب أن لا يتجاوز 32 حرفًا' })
  name: string;
}
