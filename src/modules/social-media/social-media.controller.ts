import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SocialMediaService } from './social-media.service';
import { UserGuard } from 'src/guards/user.guard';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { User } from '../user/entities/user.entity';
import { CreateSocialMediaDto } from './dto/create-social-media.dto';
import { Serilaize } from 'src/common/interceptors/serialize.interceptor';
import { SocialMediaDto } from './dto/social-media.dto';

@Controller('social-media')
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  @Serilaize(SocialMediaDto)
  @UseGuards(UserGuard)
  @Post('create')
  createSkill(@Body() dto: CreateSocialMediaDto, @CurrentUser() user: User) {
    return this.socialMediaService.createSocialMedia(dto, user.id);
  }

  @UseGuards(UserGuard)
  @Delete('/:skillId')
  deleteSkill(@Param('skillId') skillId: string, @CurrentUser() user: User) {
    return this.socialMediaService.deleteSkocialMedia(+skillId, user.id);
  }
}
