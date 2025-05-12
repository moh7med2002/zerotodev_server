import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { RquestedQuestionService } from './rquested_question.service';
import { UserGuard } from 'src/guards/user.guard';
import { CreateRequestQuestionDto } from './dto/create-request-question.dto';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { User } from '../user/entities/user.entity';
import { Serilaize } from 'src/common/interceptors/serialize.interceptor';
import { RequestedQuestionDtoWithPages } from './dto/request-question.dto';

@Controller('rquested-question')
export class RquestedQuestionController {
  constructor(
    private readonly rquestedQuestionService: RquestedQuestionService,
  ) {}

  @UseGuards(UserGuard)
  @Post('create')
  createRequestQuestion(
    @Body() body: CreateRequestQuestionDto,
    @CurrentUser() user: User,
  ) {
    return this.rquestedQuestionService.create(body, user.id);
  }

  @Serilaize(RequestedQuestionDtoWithPages)
  @Get('/all')
  getAllForAdmin(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    return this.rquestedQuestionService.fetchAll(+page, +limit);
  }
}
