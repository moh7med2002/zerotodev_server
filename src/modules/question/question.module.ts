import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionProvider } from './question.provider';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService,...QuestionProvider],
})
export class QuestionModule {}
