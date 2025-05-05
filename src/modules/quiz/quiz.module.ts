import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { QuizProvider } from './quiz.provider';
import { QuizQuestionModule } from '../quiz_question/quiz_question.module';
import { QuizAnswerModule } from '../quiz_answer/quiz_answer.module';

@Module({
  imports: [QuizQuestionModule, QuizAnswerModule],
  controllers: [QuizController],
  providers: [QuizService, ...QuizProvider],
})
export class QuizModule {}
