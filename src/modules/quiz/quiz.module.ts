import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { QuizProvider } from './quiz.provider';
import { QuizQuestionModule } from '../quiz_question/quiz_question.module';
import { QuizAnswerModule } from '../quiz_answer/quiz_answer.module';
import { UserQuizModule } from '../user_quiz/user_quiz.module';
import { UserPointModule } from '../user_point/user_point.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    QuizQuestionModule,
    QuizAnswerModule,
    UserQuizModule,
    UserPointModule,
    UserModule,
  ],
  controllers: [QuizController],
  providers: [QuizService, ...QuizProvider],
  exports: [QuizService],
})
export class QuizModule {}
