import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { UserQuiz } from './user_quiz.entity';

@Injectable()
export class UserQuizService {
    constructor(
        @Inject(repositories.user_quiz_repository) private userQuizRepo:typeof UserQuiz,
    ){}

    findOne(quizId:number,userId:number)
    {
        return this.userQuizRepo.findOne({where:{userId,quizId}})
    }

    async saveUserQuizResult(userId: number, quizId: number, mark: number) {
        const userQuiz = await this.userQuizRepo.create({quizId,userId,mark})
        return userQuiz
    }

    async checkQuizApplited(quizId:number,userId:number)
    {
        const userQuiz = await this.findOne(quizId, userId);
        if (userQuiz) {
            throw new BadRequestException('لقد قمت بحل هذا الاختبار بالفعل');
        }
    }
}
