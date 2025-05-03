import { repositories } from 'src/common/enums/repositories';
import { ArticleView } from './article_view.entity';
export const ArticleViewProvider = [
    {
        provide: repositories.article_view_repository,
        useValue: ArticleView,
    },
];