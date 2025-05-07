import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RquestedQuestionService } from './rquested_question.service';
import { UserGuard } from 'src/guards/user.guard';
import { CreateRequestQuestionDto } from './dto/create-request-question.dto';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { User } from '../user/entities/user.entity';

@Controller('rquested-question')
export class RquestedQuestionController {
  constructor(private readonly rquestedQuestionService: RquestedQuestionService) {}

  @UseGuards(UserGuard)
  @Post('create')
  createRequestQuestion(@Body() body:CreateRequestQuestionDto,@CurrentUser() user:User)
  {
    return this.rquestedQuestionService.create(body,user.id)
  }
}
