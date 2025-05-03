import { Module } from '@nestjs/common';
import { QuizQuestionService } from './quiz_question.service';
import { QuizQuestionController } from './quiz_question.controller';
import { QuizQuestionProvider } from './quiz_question.provider';

@Module({
  controllers: [QuizQuestionController],
  providers: [QuizQuestionService,...QuizQuestionProvider],
})
export class QuizQuestionModule {}
