import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentProvider } from './comment.provider';
import { QuestionModule } from '../question/question.module';
import { ArticleModule } from '../article/article.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService,...CommentProvider],
  imports:[QuestionModule,ArticleModule],
})
export class CommentModule {}
