import { UserQuiz } from './user_quiz.entity';
import { repositories } from 'src/common/enums/repositories';
export const UserQuizProvider = [
    {
        provide: repositories.user_quiz_repository,
        useValue: UserQuiz,
    },
];
