import { Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { RequestedQuestion } from './requested_question.entity';
import { CreateRequestQuestionDto } from './dto/create-request-question.dto';

@Injectable()
export class RquestedQuestionService {
    constructor(
        @Inject(repositories.requested_question_repository) private requestedQuestionRepo:typeof RequestedQuestion,
    ){}
    async create(body:CreateRequestQuestionDto,userId:number)
    {
        const question = await this.requestedQuestionRepo.create({userId,title:body.title})
        await question.save()
        return question
    }
}
