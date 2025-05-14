import { Expose } from 'class-transformer';

export class SocialMediaDto {
  @Expose()
  id: string;
  @Expose()
  url: string;
}
