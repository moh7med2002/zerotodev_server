import { QuestionView } from './question_view.entity';
import { repositories } from 'src/common/enums/repositories';
export const QuestionViewProvider = [
    {
        provide: repositories.question_view_repository,
        useValue: QuestionView,
    },
];
