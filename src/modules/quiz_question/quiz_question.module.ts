import { Module } from '@nestjs/common';
import { QuizQuestionService } from './quiz_question.service';
import { QuizQuestionController } from './quiz_question.controller';
import { QuizQuestionProvider } from './quiz_question.provider';
import { QuizAnswerModule } from '../quiz_answer/quiz_answer.module';

@Module({
  controllers: [QuizQuestionController],
  providers: [QuizQuestionService, ...QuizQuestionProvider],
  exports: [QuizQuestionService],
})
export class QuizQuestionModule {}
