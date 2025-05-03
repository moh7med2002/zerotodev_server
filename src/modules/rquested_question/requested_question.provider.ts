import { RequestedQuestion } from './requested_question.entity';
import { repositories } from 'src/common/enums/repositories';
export const RequestedQuestionProvider = [
    {
        provide: repositories.requested_question_repository,
        useValue: RequestedQuestion,
    },
];
