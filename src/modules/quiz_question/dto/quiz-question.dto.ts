import { Expose, Type } from 'class-transformer';
import { QuizAnswerDto } from 'src/modules/quiz_answer/dto/quiz-answer.dto';

export class QuizQuestionDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  quizId: number;

  @Expose()
  @Type(() => QuizAnswerDto)
  answers: QuizAnswerDto[];
}
