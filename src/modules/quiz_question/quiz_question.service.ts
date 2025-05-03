import { Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { QuizQuestion } from './quiz_question.entity';

@Injectable()
export class QuizQuestionService {
    constructor(
        @Inject(repositories.quiz_question_repository) private quizQuestionRepo:typeof QuizQuestion,
    ){}
}
