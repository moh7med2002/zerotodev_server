import { Controller } from '@nestjs/common';
import { RquestedQuestionService } from './rquested_question.service';

@Controller('rquested-question')
export class RquestedQuestionController {
  constructor(private readonly rquestedQuestionService: RquestedQuestionService) {}
}
