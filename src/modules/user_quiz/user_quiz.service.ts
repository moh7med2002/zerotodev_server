import { Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { UserQuiz } from './user_quiz.entity';

@Injectable()
export class UserQuizService {
    constructor(
        @Inject(repositories.user_quiz_repository) private userQuizRepo:typeof UserQuiz,
    ){}
}
