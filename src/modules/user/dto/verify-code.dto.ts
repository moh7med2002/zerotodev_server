import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UserRequestVerifyCodeDto {
  @IsEmail()
  @IsNotEmpty({ message: 'يجب إرسال الإيميل' })
  email: string;
}

export class UserSendVerifyCodeDto {
  @IsEmail()
  @IsNotEmpty({ message: 'يجب إرسال الإيميل' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'يجب إرسال رمز التحقق' })
  code: string;
}

export class ResetPasswordDto {
  @IsEmail()
  @IsNotEmpty({ message: 'يجب إرسال الإيميل' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
