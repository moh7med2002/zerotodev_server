import { UserService } from './../user/user.service';
import { Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { UserPoint } from './user_point.entity';
import { Points } from 'src/common/enums/points';
import { Article } from '../article/article.entity';
import { Question } from '../question/question.entity';
import { Quiz } from '../quiz/quiz.entity';

@Injectable()
export class UserPointService {
    constructor(
        @Inject(repositories.user_point_repository) private userPointRepo:typeof UserPoint,
        private userService:UserService
    ){}
    private async addPoints(userId: number, points: number, activityTitle: string, extraData?: object) {
        await this.userService.increasePoint(userId, points);
        await this.userPointRepo.create({
            date: new Date(),
            points,
            userId,
            activity_title: activityTitle,
            ...extraData,
        });
    }

    async givePointForArticleRead(userId: number, articleId: number) {
        await this.addPoints(userId, Points.article, 'قراءة مقالة', { articleId });
    }

    async givePointForQuestionRead(userId: number, questionId: number) {
        await this.addPoints(userId, Points.question, 'قراءة سؤال', { questionId });
    }

    async givePointForQuizSubmission(userId: number, quizId: number, quizMark: number) {
        if (quizMark > 0) {
            await this.addPoints(userId, Points.answer * quizMark, 'إنهاء كويز', { quizId });
        }
    }

    async getUserPoints(userId: number, page: number, limit: number) {
        const offset = (page - 1) * limit;
        const { rows, count } = await this.userPointRepo.findAndCountAll({
            where: { userId },
            include: [
            { model: Article },
            { model: Question },
            { model: Quiz }
            ],
            order: [['date', 'DESC']],
            limit,
            offset,
        });
        return {
            points: rows,
            totalPages: Math.ceil(count / limit),
        };
    }
}
