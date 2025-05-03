import { Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { QuestionView } from './question_view.entity';

@Injectable()
export class QuestionViewService {
    constructor(
        @Inject(repositories.question_view_repository) private questionViewRepo:typeof QuestionView,
    ){}
}
