import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserPointService } from './user_point.service';
import { UserPointDto } from './dto/user_point.dto';
import { UserGuard } from 'src/guards/user.guard';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { User } from '../user/entities/user.entity';
import { Serilaize } from 'src/common/interceptors/serialize.interceptor';

@Controller('user-point')
export class UserPointController {
  constructor(private readonly userPointService: UserPointService) {}
  
    @Serilaize(UserPointDto)
    @UseGuards(UserGuard)
    @Get('all')
    getUserPoints(@CurrentUser() user:User)
    {
      return this.userPointService.getUserPoints(user.id)
    }
}
