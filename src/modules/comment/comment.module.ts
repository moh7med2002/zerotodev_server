import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentProvider } from './comment.provider';

@Module({
  controllers: [CommentController],
  providers: [CommentService,...CommentProvider],
})
export class CommentModule {}
