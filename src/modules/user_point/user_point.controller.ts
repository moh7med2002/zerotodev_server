import { Controller } from '@nestjs/common';
import { UserPointService } from './user_point.service';

@Controller('user-point')
export class UserPointController {
  constructor(private readonly userPointService: UserPointService) {}
}
