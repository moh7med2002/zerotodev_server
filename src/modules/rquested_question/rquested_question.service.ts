import { Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { RequestedQuestion } from './requested_question.entity';
import { CreateRequestQuestionDto } from './dto/create-request-question.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class RquestedQuestionService {
  constructor(
    @Inject(repositories.requested_question_repository)
    private requestedQuestionRepo: typeof RequestedQuestion,
  ) {}
  async create(body: CreateRequestQuestionDto, userId: number) {
    const question = await this.requestedQuestionRepo.create({
      userId,
      title: body.title,
    });
    await question.save();
    return question;
  }

  async fetchAll(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const { rows, count } = await this.requestedQuestionRepo.findAndCountAll({
      include: [{ model: User }],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
    return {
      totalPages: Math.ceil(count / limit),
      questions: rows,
    };
  }
}
