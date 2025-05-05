import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { QuizQuestionService } from './quiz_question.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';

@Controller('quiz-question')
export class QuizQuestionController {
  constructor(private readonly quizQuestionService: QuizQuestionService) {}

  @UseGuards(AdminGuard)
  @Get('/admin/:questionId')
  getQuizQuistionForAdmin(@Param('questionId') questionId: string) {
    return this.quizQuestionService.getOne(+questionId);
  }

  @UseGuards(AdminGuard)
  @Put('/admin/:questionId/update')
  updateQuizQuistion(
    @Param('questionId') questionId: string,
    @Body() dto: UpdateQuizQuestionDto,
  ) {
    return this.quizQuestionService.updateQuestionWithAnswers(+questionId, dto);
  }
}
