import { Controller } from '@nestjs/common';
import { QuestionViewService } from './question_view.service';

@Controller('question-view')
export class QuestionViewController {
  constructor(private readonly questionViewService: QuestionViewService) {}
}
