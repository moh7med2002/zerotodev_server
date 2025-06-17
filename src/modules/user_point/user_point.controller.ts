import { Controller, Get, UseGuards,Query } from '@nestjs/common';
import { UserPointService } from './user_point.service';
import { UserGuard } from 'src/guards/user.guard';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { User } from '../user/entities/user.entity';
import { Serilaize } from 'src/common/interceptors/serialize.interceptor';
import { PaginatedUserPointsDto } from './dto/paginated-user-points.dto';

@Controller('user-point')
export class UserPointController {
  constructor(private readonly userPointService: UserPointService) {}

    @Serilaize(PaginatedUserPointsDto)
    @UseGuards(UserGuard)
    @Get('all')
    getUserPoints(
      @CurrentUser() user: User,
      @Query('page') page: string = '1',
      @Query('limit') limit: string = '10',
    ) {
      return this.userPointService.getUserPoints(user.id, +page, +limit);
    }
}
