import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionProvider } from './question.provider';
import { UserPointModule } from '../user_point/user_point.module';
import { QuestionViewModule } from '../question_view/question_view.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService,...QuestionProvider],
  imports:[UserPointModule,QuestionViewModule,UserModule]
})
export class QuestionModule {}
