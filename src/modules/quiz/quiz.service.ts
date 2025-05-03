import { Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Quiz } from './quiz.entity';

@Injectable()
export class QuizService {
    constructor(
        @Inject(repositories.quiz_repository) private quizRepo:typeof Quiz,
    ){}
}
