import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateSocialMediaDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  url: string;
}
