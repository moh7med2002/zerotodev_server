import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UserGuard } from 'src/guards/user.guard';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { User } from '../user/entities/user.entity';
import { Serilaize } from 'src/common/interceptors/serialize.interceptor';
import { SkillDto } from './dto/skill.dto';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Serilaize(SkillDto)
  @UseGuards(UserGuard)
  @Post('create')
  createSkill(@Body() dto: CreateSkillDto, @CurrentUser() user: User) {
    return this.skillService.createSkill(dto, user.id);
  }

  @UseGuards(UserGuard)
  @Delete('/:skillId')
  deleteSkill(@Param('skillId') skillId: string, @CurrentUser() user: User) {
    return this.skillService.deleteSkill(+skillId, user.id);
  }

  @Serilaize(SkillDto)
  @UseGuards(UserGuard)
  @Get()
  getAllSocialByUser(@CurrentUser() user:User)
  {
    return this.skillService.getAllByUser(user.id)
  }
}
