import { Expose, Type } from 'class-transformer';

class RelatedEntityDto {
  @Expose()
  id: number;

  @Expose()
  title: string;
}

class RelatedUserEntityDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  image: string;
}

export class UserQuizDto {
  @Expose()
  id: number;

  @Expose()
  mark: number;

  @Expose()
  total: number;

  @Expose()
  @Type(() => RelatedEntityDto)
  quiz: RelatedEntityDto;

  @Expose()
  @Type(() => RelatedUserEntityDto)
  user: RelatedUserEntityDto;
}
