import { Module } from '@nestjs/common';
import { UserPointService } from './user_point.service';
import { UserPointController } from './user_point.controller';
import { UserPointProvider } from './user_point.provider';

@Module({
  controllers: [UserPointController],
  providers: [UserPointService,...UserPointProvider],
  exports:[UserPointService]
})
export class UserPointModule {}
