import { Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { QuestionView } from './question_view.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class QuestionViewService {
    constructor(
        @Inject(repositories.question_view_repository) private questionViewRepo:typeof QuestionView,
    ){}
        async registerView(questionId: number, user:User|null, ip: string) {
            const alreadyViewed = await this.questionViewRepo.findOne({
                where: user
                    ? { userId: user.id, questionId }
                    : { questionId, ip },
            });
            
            if (alreadyViewed) return true;
            await this.questionViewRepo.create({
                questionId,
                userId: user ? user.id : null,
                ip: user ? null : ip,
            });
            return false;
        }
}
