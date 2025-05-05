import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { QuizQuestion } from './quiz_question.entity';
import { QuizAnswer } from '../quiz_answer/quiz_answer.entity';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';

@Injectable()
export class QuizQuestionService {
  constructor(
    @Inject(repositories.quiz_question_repository)
    private quizQuestionRepo: typeof QuizQuestion,
  ) {}

  async createQuestion(title: string, quizId: number) {
    return this.quizQuestionRepo.create({ title, quizId });
  }

  async getOne(questionId: number) {
    const question = await this.quizQuestionRepo.findOne({
      where: { id: questionId },
      include: [{ model: QuizAnswer }],
    });
    if (!question) {
      throw new BadRequestException('هذا السؤال غير متاح');
    }
    return question;
  }

  async updateQuestionWithAnswers(
    questionId: number,
    data: UpdateQuizQuestionDto,
  ) {
    const question = await this.quizQuestionRepo.findByPk(questionId);

    if (!question) throw new Error('السؤال غير موجود');

    // Update question title
    question.title = data.title;
    await question.save();

    // Delete old answers
    await QuizAnswer.destroy({ where: { questionId } });

    // Create new answers
    await QuizAnswer.bulkCreate(
      data.answers.map((ans) => ({
        questionId,
        title: ans.text,
        isCorrect: ans.isCorrect,
      })),
    );

    return { message: 'تم تحديث السؤال بنجاح' };
  }
}
