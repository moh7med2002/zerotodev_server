import { Controller } from '@nestjs/common';
import { ArticleViewService } from './article_view.service';

@Controller('article-view')
export class ArticleViewController {
  constructor(private readonly articleViewService: ArticleViewService) {}
}
