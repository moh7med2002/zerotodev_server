import { Module } from '@nestjs/common';
import { QuestionViewService } from './question_view.service';
import { QuestionViewController } from './question_view.controller';
import { QuestionViewProvider } from './question_view.provider';

@Module({
  controllers: [QuestionViewController],
  providers: [QuestionViewService,...QuestionViewProvider],
})
export class QuestionViewModule {}
