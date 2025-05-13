import { Expose, Type } from 'class-transformer';

export class RequestedQuestionUserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  image: string;
}

export class RequestedQuestionDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  createdAt: string;

  @Expose()
  @Type(() => RequestedQuestionUserDto)
  user: RequestedQuestionUserDto;
}

export class RequestedQuestionDtoWithPages {
  @Expose()
  @Type(() => RequestedQuestionDto)
  questions: RequestedQuestionDto[];

  @Expose()
  totalPages: number;
}
