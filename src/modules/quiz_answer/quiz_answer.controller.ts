import { Controller } from '@nestjs/common';
import { QuizAnswerService } from './quiz_answer.service';

@Controller('quiz-answer')
export class QuizAnswerController {
  constructor(private readonly quizAnswerService: QuizAnswerService) {}
}
