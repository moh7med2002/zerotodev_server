import { Module } from '@nestjs/common';
import { QuizAnswerService } from './quiz_answer.service';
import { QuizAnswerController } from './quiz_answer.controller';
import { QuizAnswerProvider } from './quiz_answer.provider';

@Module({
  controllers: [QuizAnswerController],
  providers: [QuizAnswerService, ...QuizAnswerProvider],
  exports: [QuizAnswerService],
})
export class QuizAnswerModule {}
