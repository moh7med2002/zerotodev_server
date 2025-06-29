import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { QuizAnswer } from './quiz_answer.entity';
import { Op } from 'sequelize';

@Injectable()
export class QuizAnswerService {
  constructor(
    @Inject(repositories.quiz_answer_repository)
    private quizAnswerRepo: typeof QuizAnswer,
  ) {}

  async createAnswers(answers) {
    return this.quizAnswerRepo.bulkCreate(answers);
  }

  async getSubmittedAnswers(answerIds: number[]) {
    const answers = await QuizAnswer.findAll({
      where: { id: { [Op.in]: answerIds } },
      include: ['question'],
    });

    if (answers.length === 0) {
      throw new BadRequestException('لم يتم العثور على الإجابات المقدمة.');
    }

    return answers;
  }

  validateSubmittedAnswers(answers: QuizAnswer[], expectedCount: number) {
    const uniqueQuestions = new Set(answers.map((a) => a.questionId));
    if (uniqueQuestions.size !== expectedCount) {
      throw new BadRequestException('يجب عليك الإجابة على جميع الأسئلة.');
    }
  }

  countCorrectAnswers(answers: QuizAnswer[]) {
    return answers.filter((a) => a.isCorrect).length;
  }
}
