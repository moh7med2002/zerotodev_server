import { Expose } from 'class-transformer';

export class QuizAnswerDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  isCorrect: boolean;
}
