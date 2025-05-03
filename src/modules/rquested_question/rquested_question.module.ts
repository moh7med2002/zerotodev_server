import { Module } from '@nestjs/common';
import { RquestedQuestionService } from './rquested_question.service';
import { RquestedQuestionController } from './rquested_question.controller';
import { RequestedQuestionProvider } from './requested_question.provider';

@Module({
  controllers: [RquestedQuestionController],
  providers: [RquestedQuestionService,...RequestedQuestionProvider],
})
export class RquestedQuestionModule {}
