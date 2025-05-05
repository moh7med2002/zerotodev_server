import { Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { QuizAnswer } from './quiz_answer.entity';

@Injectable()
export class QuizAnswerService {
  constructor(
    @Inject(repositories.quiz_answer_repository)
    private quizAnswerRepo: typeof QuizAnswer,
  ) {}

  async createAnswers(answers) {
    return this.quizAnswerRepo.bulkCreate(answers);
  }
}
