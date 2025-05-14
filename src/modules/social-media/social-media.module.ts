import { Module } from '@nestjs/common';
import { SocialMediaService } from './social-media.service';
import { SocialMediaController } from './social-media.controller';
import { SocialMediaProvider } from './social-media.provider';

@Module({
  controllers: [SocialMediaController],
  providers: [SocialMediaService, ...SocialMediaProvider],
})
export class SocialMediaModule {}
