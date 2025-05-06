import { Module } from '@nestjs/common';
import { UserQuizService } from './user_quiz.service';
import { UserQuizController } from './user_quiz.controller';
import { UserQuizProvider } from './user_quiz.provider';

@Module({
  controllers: [UserQuizController],
  providers: [UserQuizService,...UserQuizProvider],
  exports:[UserQuizService]
})
export class UserQuizModule {}
