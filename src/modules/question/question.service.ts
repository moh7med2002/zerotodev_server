import { QuestionViewService } from './../question_view/question_view.service';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Question } from './question.entity';
import { createQuestionDto } from './dto/create-question.dto';
import { User } from '../user/entities/user.entity';
import { Comment } from '../comment/comment.entity';
import { UserPointService } from '../user_point/user_point.service';
import { CurrentUserPayload } from 'src/common/types/current-user.type';
import { UpdateQuestionStatusDto } from './dto/update-question-status.dto';

@Injectable()
export class QuestionService {
  constructor(
    @Inject(repositories.question_repository)
    private questionRepo: typeof Question,
    private userPointService: UserPointService,
    private questionViewService: QuestionViewService,
  ) {}
  async create(body: createQuestionDto) {
    const question = await this.questionRepo.create({ ...body });
    await question.save();
    return question;
  }

  async update(attrs: Partial<createQuestionDto>, id: number) {
    const question = await this.findbyId(id);
    if (!question) {
      throw new NotFoundException('السؤال غير متوفر');
    }
    Object.assign(question, attrs);
    return question.save();
  }

  findbyId(id: number) {
    return this.questionRepo.findByPk(id);
  }

  async findAll(page: number, limit: number, status: string) {
    const offset = (page - 1) * limit;
    const { rows, count } = await this.questionRepo.findAndCountAll({
      where: { status },
      limit,
      offset,
      order: [['publish_date', 'DESC']],
      attributes: ['id', 'title', 'headline', 'publish_date', 'views'],
    });
    return {
      questions: rows,
      totalPages: Math.ceil(count / limit),
    };
  }

  getLatest(limit: number, status: string) {
    return this.questionRepo.findAll({
      where: { status },
      order: [['publish_date', 'DESC']],
      limit,
    });
  }

  getRandom(limit: number, status: string) {
    return this.questionRepo.findAll({
      where: { status },
      order: this.questionRepo.sequelize?.random(),
      limit,
    });
  }

  async getOne(id: number, status: string) {
    const question = await this.questionRepo.findOne({
      where: { id, status },
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    });
    if (!question) {
      throw new NotFoundException('المقالة غير متوفرة');
    }
    return question;
  }

  async getOneWithTracking(
    id: number,
    user: User | null,
    ip: string,
    status: string,
  ) {
    const question = await this.getOne(id, status);
    const alreadyViewed = await this.questionViewService.registerView(
      id,
      user,
      ip,
    );
    if (!alreadyViewed) {
      question.views++;
      question.save();
      if (user) {
        await this.userPointService.givePointForQuestionRead(user.id, id);
      }
    }
    return question;
  }

  async updateStatus(questionId: number, dto: UpdateQuestionStatusDto) {
    const question = await this.getQuestion(questionId);
    question.status = dto.status;
    if (!question.publish_date) {
      question.publish_date = new Date();
    }
    return question.save();
  }

  async getQuestion(questionId: number) {
    const question = await this.questionRepo.findOne({
      where: { id: questionId },
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    });
    if (!question) {
      throw new BadRequestException('السؤال غير موجود');
    }
    return question;
  }

  countQuestions() {
    return this.questionRepo.count();
  }
}
