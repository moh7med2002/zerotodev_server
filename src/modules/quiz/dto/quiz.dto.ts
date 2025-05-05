import { Expose, Type } from 'class-transformer';
import { QuizQuestionDto } from 'src/modules/quiz_question/dto/quiz-question.dto';

export class QuizDto {
  @Expose()
  id: number;

  @Expose()
  headline: string;

  @Expose()
  title: string;

  @Expose()
  status: string;

  @Expose()
  quistionCount: number;

  @Expose()
  @Type(() => QuizQuestionDto)
  questions: QuizQuestionDto[];
}
