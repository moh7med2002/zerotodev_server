import { Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { RequestedQuestion } from './requested_question.entity';

@Injectable()
export class RquestedQuestionService {
    constructor(
        @Inject(repositories.requested_question_repository) private requestedQuestionRepo:typeof RequestedQuestion,
    ){}
}
