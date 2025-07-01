import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { createQuestionDto } from './dto/create-question.dto';
import { Serilaize } from 'src/common/interceptors/serialize.interceptor';
import { ActionQuestionDto } from './dto/action-question.dto';
import { ItemStatus } from 'src/common/enums/itemStatus';
import { QuestionSummaryDto } from './dto/question-summary.dto';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { User } from '../user/entities/user.entity';
import { DetailedQuestionDto } from './dto/detailed-question.dto';
import { OptionalUserGuard } from 'src/guards/optionalUser.guard';
import { UpdateQuestionStatusDto } from './dto/update-question-status.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Serilaize(ActionQuestionDto)
  @UseGuards(AdminGuard)
  @Post('create')
  createQuestion(@Body() body: createQuestionDto) {
    return this.questionService.create(body);
  }

  @Serilaize(ActionQuestionDto)
  @UseGuards(AdminGuard)
  @Put(':id')
  updateQuestion(
    @Body() body: Partial<createQuestionDto>,
    @Param('id') id: string,
  ) {
    return this.questionService.update(body, +id);
  }

  @Get('all')
  getAllQuestions(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
    @Query('name') name?: string,
  ) {
    return this.questionService.findAll(
      +page,
      +limit,
      ItemStatus.PUBLISHED,
      name,
    );
  }

  @UseGuards(AdminGuard)
  @Get('admin/all')
  getAllQuestionsForAdmin(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
    @Query('status') status: string = ItemStatus.PUBLISHED,
  ) {
    return this.questionService.findAll(+page, +limit, status);
  }

  @Serilaize(QuestionSummaryDto)
  @Get('latest')
  getLatestQuestions(@Query('limit') limit: string = '3') {
    return this.questionService.getLatest(+limit, ItemStatus.PUBLISHED);
  }

  @Serilaize(QuestionSummaryDto)
  @Get('random')
  getRandomQuestions(@Query('limit') limit: string = '3') {
    return this.questionService.getRandom(+limit, ItemStatus.PUBLISHED);
  }

  @Serilaize(DetailedQuestionDto)
  @UseGuards(OptionalUserGuard)
  @Get(':id')
  getSingleQuestion(
    @Param('id') id: string,
    @CurrentUser() user: User | null,
    @Req() req,
  ) {
    return this.questionService.getOneWithTracking(
      +id,
      user,
      req.ip,
      ItemStatus.PUBLISHED,
    );
  }

  @UseGuards(AdminGuard)
  @Patch('/update/:questionId/status')
  updateQuestionStatus(
    @Body() dto: UpdateQuestionStatusDto,
    @Param('questionId') questionId: string,
  ) {
    return this.questionService.updateStatus(+questionId, dto);
  }

  @Serilaize(DetailedQuestionDto)
  @UseGuards(AdminGuard)
  @Get('/admin/:questionId')
  getQuestionDetailsForAdmin(@Param('questionId') questionId: string) {
    console.log(questionId);
    return this.questionService.getQuestion(+questionId);
  }
}
