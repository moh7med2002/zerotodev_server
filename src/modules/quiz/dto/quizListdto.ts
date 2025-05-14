import { Expose, Type } from 'class-transformer';

export class QuizListDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  headline: string;

  @Expose()
  publish_date: string;

  @Expose({ name: 'quistionCount' })
  questionCount: number;

  @Expose({ name: 'userCount' })
  userCount: number;
}

export class QuizListResponseDto {
  @Expose()
  @Type(() => QuizListDto)
  quizes: QuizListDto[];

  @Expose()
  totalPages: number;
}
