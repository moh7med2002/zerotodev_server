import { Controller } from '@nestjs/common';
import { UserQuizService } from './user_quiz.service';

@Controller('user-quiz')
export class UserQuizController {
  constructor(private readonly userQuizService: UserQuizService) {}
}
