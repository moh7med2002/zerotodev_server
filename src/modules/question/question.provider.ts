import { Question } from './question.entity';
import { repositories } from 'src/common/enums/repositories';
export const QuestionProvider = [
    {
        provide: repositories.question_repository,
        useValue: Question,
    },
];
