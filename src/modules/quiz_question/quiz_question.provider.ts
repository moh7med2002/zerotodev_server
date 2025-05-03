import { QuizQuestion } from './quiz_question.entity';
import { repositories } from 'src/common/enums/repositories';
export const QuizQuestionProvider = [
    {
        provide: repositories.quiz_question_repository,
        useValue: QuizQuestion,
    },
];
