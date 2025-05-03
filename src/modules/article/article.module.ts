import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ArticleProvider } from './article.provider';
import { CategoryModule } from '../category/category.module';
import { UserPointModule } from '../user_point/user_point.module';
import { ArticleViewModule } from '../article_view/article_view.module';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService,...ArticleProvider],
  imports:[CategoryModule,UserPointModule,ArticleViewModule]
})
export class ArticleModule {}
