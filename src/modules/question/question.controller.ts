import { Body, Controller, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { createQuestionDto } from './dto/createQuestion.dto';
import { Serilaize } from 'src/common/interceptors/serialize.interceptor';
import { ActionQuestionDto } from './dto/actionQuestion.dto';
import { QuestionDto } from './dto/question.dto';
import { ItemStatus } from 'src/common/enums/itemStatus';
import { QuestionSummaryDto } from './dto/questionSummary.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Serilaize(ActionQuestionDto)
  @UseGuards(AdminGuard)
  @Post('create')
  createQuestion(@Body() body:createQuestionDto)
  {
    return this.questionService.create(body)
  }

  @Serilaize(ActionQuestionDto)
  @UseGuards(AdminGuard)
  @Put(':id')
  updateQuestion(@Body() body:Partial<createQuestionDto>,@Param('id') id:string)
  {
    return this.questionService.update(body,+id)
  }

  @Serilaize(QuestionDto)
  @Get('all')
  getAllQuestions()
  {
    return this.questionService.findAll()
  }

  @Serilaize(QuestionSummaryDto)
  @Get('latest')
  getLatestQuestions(@Query('limit') limit: string = '3')
  {
    return this.questionService.getLatest(+limit,ItemStatus.PUBLISHED)
  }
  
  @Serilaize(QuestionSummaryDto)
  @Get('random')
  getRandomQuestions(@Query('limit') limit: string = '3')
  {
    return this.questionService.getRandom(+limit,ItemStatus.PUBLISHED)
  }
}
