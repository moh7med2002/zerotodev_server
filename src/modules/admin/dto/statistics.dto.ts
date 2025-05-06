import { Expose } from 'class-transformer';

export class StatisticsDto {
  @Expose()
  userCount: number;

  @Expose()
  articleCount: number;

  @Expose()
  quizCount: number;

  @Expose()
  questionCount: number;
}
