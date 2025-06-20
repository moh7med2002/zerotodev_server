import { Expose } from 'class-transformer';

export class UserProfileDto {
  @Expose()
  id: number;

  @Expose()
  image: string;

  @Expose()
  name: string;

  @Expose()
  bio: string;

  @Expose()
  email: string;

  @Expose()
  active: string;
}
