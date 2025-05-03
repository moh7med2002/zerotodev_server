import { repositories } from 'src/common/enums/repositories';
import { QuizAnswer } from './quiz_answer.entity';
export const QuizAnswerProvider = [
    {
        provide: repositories.quiz_answer_repository,
        useValue: QuizAnswer,
    },
];