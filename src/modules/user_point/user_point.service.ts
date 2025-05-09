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
    async givePointForArticleRead(userId: number, articleId: number) {
        await this.userService.increasePoint(userId,Points.article)
        await this.userPointRepo.create({
            date: new Date(),
            points: Points.article,
            userId,
            articleId,
            activity_title: 'قراءة مقالة',
        });
    }
    async givePointForQuestionRead(userId: number, questionId: number) {
        await this.userService.increasePoint(userId,Points.question)
        await this.userPointRepo.create({
            date: new Date(),
            points: Points.question,
            userId,
            questionId,
            activity_title: 'قراءة سؤال',
        });
    }

    async givePointForQuizSubmittion(userId: number, quizId: number,quizMark:number) {
        if(Points.answer * quizMark!==0)
        await this.userService.increasePoint(userId,Points.answer * quizMark)
        await this.userPointRepo.create({
            date: new Date(),
            points: Points.answer * quizMark,
            userId,
            quizId,
            activity_title: 'إنهاء كويز',
        });
    }

    getUserPoints(userId:number)
    {
        return this.userPointRepo.findAll({
            where: { userId },
            include: [
                {model:Article},
                {model:Question},
                {model:Quiz}
            ],
            order: [['date', 'DESC']],
        });
    }
}
