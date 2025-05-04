import { repositories } from 'src/common/enums/repositories';
import { ArticleView } from './article_view.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CurrentUserPayload } from 'src/common/types/current-user.type';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ArticleViewService {
    constructor(
        @Inject(repositories.article_view_repository) private articleViewRepo:typeof ArticleView,
    ){}
    async registerView(articleId: number, user: User | null, ip: string) {
        const alreadyViewed = await this.articleViewRepo.findOne({
            where: user
                ? { userId: user.id, articleId }
                : { articleId, ip },
            });
        
            if (alreadyViewed) return true;
        
            await this.articleViewRepo.create({
            articleId,
            userId: user ? user.id : null,
            ip: user ? null : ip,
            });
            return false;
        }
    }
