import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserQuizService } from './user_quiz.service';
import { Serilaize } from 'src/common/interceptors/serialize.interceptor';
import { UserQuizDto } from './dto/user-quiz.dto';
import { UserGuard } from 'src/guards/user.guard';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { User } from '../user/entities/user.entity';

@Controller('user-quiz')
export class UserQuizController {
  constructor(private readonly userQuizService: UserQuizService) {}
    @Serilaize(UserQuizDto)
    @UseGuards(UserGuard)
    @Get('all')
    getUserQuizes(@CurrentUser() user:User)
    {
        return this.userQuizService.getUserQuizes(user.id)
    }
}