import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateSocialMediaDto {
  @IsNotEmpty({ message: 'رابط الشبكة الاجتماعية مطلوب' })
  @IsString({ message: 'رابط الشبكة الاجتماعية يجب أن يكون نصًا' })
  @IsUrl({}, { message: 'يرجى إدخال رابط صالح' })
  url: string;
}
