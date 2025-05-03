import { Module } from '@nestjs/common';
import { ArticleViewService } from './article_view.service';
import { ArticleViewController } from './article_view.controller';
import { ArticleViewProvider } from './article_view.provider';

@Module({
  controllers: [ArticleViewController],
  providers: [ArticleViewService,...ArticleViewProvider],
  exports:[ArticleViewService]
})
export class ArticleViewModule {}
