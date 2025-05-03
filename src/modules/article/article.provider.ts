import { Article } from './article.entity';
import { repositories } from 'src/common/enums/repositories';
export const ArticleProvider = [
    {
        provide: repositories.article_repository,
        useValue: Article,
    },
];
