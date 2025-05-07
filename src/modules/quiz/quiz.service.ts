import { UserQuizService } from './../user_quiz/user_quiz.service';
import {
  BadGatewayException,
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Quiz } from './quiz.entity';
import { createQuizDto } from './dto/create-quiz.dto';
import { ItemStatus } from 'src/common/enums/itemStatus';
import { Sequelize } from 'sequelize-typescript';
import { UpdateQuizStatusDto } from './dto/update-quiz-status.dto';
import { QuizQuestion } from '../quiz_question/quiz_question.entity';
import { QuizAnswer } from '../quiz_answer/quiz_answer.entity';
import { QuizQuestionService } from '../quiz_question/quiz_question.service';
import { QuizAnswerService } from '../quiz_answer/quiz_answer.service';
import { CreateQuizWithQuestionsDto } from './dto/create-quiz-questions.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dot';

@Injectable()
export class QuizService {
  constructor(
    @Inject(repositories.quiz_repository)
    private quizRepo: typeof Quiz,

    private readonly quizQuistionService: QuizQuestionService,
    private readonly quizAnswerService: QuizAnswerService,
    private readonly userQuizService: UserQuizService,
  ) {}

  async createQuiz(dto: createQuizDto) {
    const quiz = await this.quizRepo.create({ ...dto });
    return quiz;
  }

  async findAll(page: number, limit: number, status: string) {
    const orderBy =
      status === ItemStatus.PUBLISHED ? 'publish_date' : 'updatedAt';

    const offset = (page - 1) * limit;
    const { rows, count } = await this.quizRepo.findAndCountAll({
      where: { status },
      limit,
      offset,
      order: [[orderBy, 'DESC']],
      raw: true,
      attributes: {
        include: [
          [
            Sequelize.literal(`(
                        SELECT COUNT(*) 
                        FROM quiz_questions AS a 
                        WHERE a.quizId = Quiz.id
                      )`),
            'quistionCount',
          ],
        ],
      },
    });
    return {
      quizes: rows,
      totalPages: Math.ceil(count / limit),
    };
  }

  async updateStatus(dto: UpdateQuizStatusDto, quizId: number) {
    const quiz = await this.findById(quizId);
    if (!quiz.publish_date) {
      quiz.publish_date = new Date();
    }
    quiz.status = dto.status;
    return quiz.save();
  }

  async updateQuizInfo(quizId: number, dto: createQuizDto) {
    const quiz = await this.findById(quizId);
    Object.assign(quiz, dto);
    return quiz.save();
  }

  async findById(quizId: number) {
    const quiz = await this.quizRepo.findOne({ where: { id: quizId } });
    if (!quiz) {
      throw new BadGatewayException('هذا الإختبار غير متوفر');
    }
    return quiz;
  }

  async createQuizQuestions(dto: CreateQuizWithQuestionsDto) {
    for (const question of dto.questions) {
      // Create question with quizId
      const createdQuestion = await this.quizQuistionService.createQuestion(
        question.title,
        +dto.quizId,
      );

      // Create answers and mark correct one
      const answersToCreate = question.answers.map((answerText, index) => ({
        title: answerText,
        questionId: createdQuestion.id,
        isCorrect: index === question.correctAnswer,
      }));

      // Bulk insert answers
      await this.quizAnswerService.createAnswers(answersToCreate);
    }

    return { message: 'تم إنشاء الأسئلة بنجاح' };
  }

  async getQuizDetails(quizId: number) {
    const quiz = await this.quizRepo.findOne({
      where: { id: quizId },
      include: [{ model: QuizQuestion, include: [{ model: QuizAnswer }] }],
    });
    if (!quiz) {
      throw new BadRequestException('هذا الاختبار غير متاح');
    }
    return quiz;
  }

  async findOneForUser(id: number, userId: number) {
    const quiz = await this.quizRepo.findOne({
      where: { status: ItemStatus.PUBLISHED, id },
      raw:true,
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*) 
              FROM quiz_questions AS a 
              WHERE a.quizId = Quiz.id
              )`),
            'quistionCount',
          ],
        ],
      },
    });

    if (!quiz) {
      throw new NotFoundException('الكويز غير متوفر');
    }
    const userQuiz = await this.userQuizService.findOne(quiz.id, userId);
    const hasSubmitted = userQuiz ? true : false;
    const marks = userQuiz ? userQuiz.mark : null;
    return { quiz, marks, hasSubmitted };
  }

  async getQuizWithQuestionsForUser(quizId: number, userId: number) {
    // Check if quiz exists and is published
    const quiz = await this.quizRepo.findOne({
      where: { id: quizId, status: ItemStatus.PUBLISHED },
      include: [
        {
          model: QuizQuestion,
          include: [QuizAnswer],
        },
      ],
    });

    if (!quiz) {
      throw new NotFoundException('الاختبار غير متاح');
    }

    // Check if user already submitted
    await this.userQuizService.checkQuizApplited(quizId, userId);
    return quiz;
  }

  countQuizes() {
    return this.quizRepo.count();
  }

  async submitQuiz(userId:number,body:SubmitQuizDto)
  {
    const {quizId,answers} = body
      // 1. Fetch quiz with questions and check if it applied
      const quiz = await this.getQuizWithQuestionsForUser(quizId,userId);
      const totalQuestions = quiz.questions.length;
    
      const submittedAnswers = await this.quizAnswerService.getSubmittedAnswers(answers);
      this.quizAnswerService.validateSubmittedAnswers(submittedAnswers, totalQuestions);
    
      const correctCount = this.quizAnswerService.countCorrectAnswers(submittedAnswers);
      await this.userQuizService.saveUserQuizResult(userId, quizId, correctCount);
    
      return {
        totalQuestions,
        correctAnswers: correctCount,
        score: `${correctCount} / ${totalQuestions}`,
      };
    }
}