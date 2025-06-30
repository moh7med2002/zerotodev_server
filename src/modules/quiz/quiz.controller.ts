import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { createQuizDto } from './dto/create-quiz.dto';
import { ItemStatus } from 'src/common/enums/itemStatus';
import { Serilaize } from 'src/common/interceptors/serialize.interceptor';
import { QuizDto } from './dto/quiz.dto';
import { UpdateQuizStatusDto } from './dto/update-quiz-status.dto';
import { CreateQuizWithQuestionsDto } from './dto/create-quiz-questions.dto';
import { QuizListResponseDto } from './dto/quizListdto';
import { UserGuard } from 'src/guards/user.guard';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { User } from '../user/entities/user.entity';
import { QuizUserViewResponseDto } from './dto/quiz-user-view.dto';
import { QuizWithQuestionsDto } from './dto/quiz-with-questions.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dot';
import { ActiveUserGuard } from 'src/guards/active.user.guard';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @UseGuards(AdminGuard)
  @Post('/create')
  createQuiz(@Body() dto: createQuizDto) {
    return this.quizService.createQuiz(dto);
  }

  @Serilaize(QuizListResponseDto)
  @Get('/all')
  getAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
    @Query('status') status: string = ItemStatus.PUBLISHED,
    @Query('name') name?: string,
  ) {
    return this.quizService.findAll(+page, +limit, status, name);
  }

  @UseGuards(AdminGuard)
  @Patch('/update/:quizId/status')
  updateQuizStatus(
    @Body() dto: UpdateQuizStatusDto,
    @Param('quizId') quizId: string,
  ) {
    return this.quizService.updateStatus(dto, +quizId);
  }

  @UseGuards(AdminGuard)
  @Put('/admin/create-questions')
  insertQuestionsToQuiz(@Body() dto: CreateQuizWithQuestionsDto) {
    return this.quizService.createQuizQuestions(dto);
  }

  @Serilaize(QuizDto)
  @UseGuards(AdminGuard)
  @Get('/admin/:quizId')
  quizDetailsForAdmin(@Param('quizId') quizId: string) {
    return this.quizService.getQuizDetails(+quizId);
  }

  @Serilaize(QuizDto)
  @UseGuards(AdminGuard)
  @Get('/admin/:quizId/summary')
  getQuiz(@Param('quizId') quizId: string) {
    return this.quizService.findById(+quizId);
  }

  @UseGuards(AdminGuard)
  @Put('/admin/:quizId/update')
  updateQuizInfo(@Body() dto: createQuizDto, @Param('quizId') quizId: string) {
    return this.quizService.updateQuizInfo(+quizId, dto);
  }

  @Serilaize(QuizUserViewResponseDto)
  @UseGuards(UserGuard)
  @Get('user/:quizId')
  getQuizForUser(@Param('quizId') id: string, @CurrentUser() user: User) {
    return this.quizService.findOneForUser(+id, +user.id);
  }

  @Serilaize(QuizWithQuestionsDto)
  @UseGuards(UserGuard, ActiveUserGuard)
  @Get('user/:quizId/questions')
  getQuizWithQuestionsForUser(
    @Param('quizId') id: string,
    @CurrentUser() user: User,
  ) {
    return this.quizService.getQuizWithQuestionsForUser(+id, +user.id);
  }

  @UseGuards(UserGuard)
  @Post('/submit')
  submitQuiz(@CurrentUser() user: User, @Body() body: SubmitQuizDto) {
    return this.quizService.submitQuiz(user.id, body);
  }
}
