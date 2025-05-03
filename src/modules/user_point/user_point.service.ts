import { Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { UserPoint } from './user_point.entity';

@Injectable()
export class UserPointService {
    constructor(
        @Inject(repositories.user_point_repository) private userPointRepo:typeof UserPoint,
    ){}
    async givePointForArticleRead(userId: number, articleId: number) {
        await this.userPointRepo.create({
            date: new Date(),
            points: 1,
            userId,
            articleId,
            activity_title: 'قراءة مقالة',
        });
    }
}
