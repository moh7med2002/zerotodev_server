import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { UserQuiz } from './user_quiz.entity';
import { Quiz } from '../quiz/quiz.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class UserQuizService {
  constructor(
    @Inject(repositories.user_quiz_repository)
    private userQuizRepo: typeof UserQuiz,
  ) {}

  findOne(quizId: number, userId: number) {
    return this.userQuizRepo.findOne({ where: { userId, quizId } });
  }

  async saveUserQuizResult(
    userId: number,
    quizId: number,
    mark: number,
    total: number,
  ) {
    const userQuiz = await this.userQuizRepo.create({
      quizId,
      userId,
      mark,
      total,
    });
    return userQuiz;
  }

  async checkQuizApplited(quizId: number, userId: number) {
    const userQuiz = await this.findOne(quizId, userId);
    if (userQuiz) {
      throw new BadRequestException('لقد قمت بحل هذا الاختبار بالفعل');
    }
  }

  getUserQuizes(userId: number) {
    return this.userQuizRepo.findAll({
      where: { userId },
      include: [Quiz],
    });
  }

  getQuizUsers(quizId: number) {
    return this.userQuizRepo.findAll({
      where: { quizId },
      include: [{ model: User }],
    });
  }
}
