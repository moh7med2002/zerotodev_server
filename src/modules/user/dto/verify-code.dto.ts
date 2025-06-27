import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UserRequestVerifyCodeDto {
  @IsEmail({}, { message: 'يرجى إدخال بريد إلكتروني صالح' })
  @IsNotEmpty({ message: 'يجب إرسال الإيميل' })
  email: string;
}

export class UserSendVerifyCodeDto {
  @IsEmail({}, { message: 'يرجى إدخال بريد إلكتروني صالح' })
  @IsNotEmpty({ message: 'يجب إرسال الإيميل' })
  email: string;

  @IsString({ message: 'رمز التحقق يجب أن يكون نصًا' })
  @IsNotEmpty({ message: 'يجب إرسال رمز التحقق' })
  code: string;
}

export class ResetPasswordDto {
  @IsEmail({}, { message: 'يرجى إدخال بريد إلكتروني صالح' })
  @IsNotEmpty({ message: 'يجب إرسال الإيميل' })
  email: string;

  @IsString({ message: 'كلمة المرور يجب أن تكون نصًا' })
  @IsNotEmpty({ message: 'كلمة المرور مطلوبة' })
  password: string;
}
