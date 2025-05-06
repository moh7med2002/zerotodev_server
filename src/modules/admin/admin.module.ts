import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminProvider } from './admin.repository';
import { UserModule } from '../user/user.module';
import { ArticleModule } from '../article/article.module';
import { QuizModule } from '../quiz/quiz.module';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [UserModule, ArticleModule, QuizModule, QuestionModule],
  controllers: [AdminController],
  providers: [AdminService, ...AdminProvider],
})
export class AdminModule {}
