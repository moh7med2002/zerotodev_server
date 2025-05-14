import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { SkillProvider } from './skill.provider';

@Module({
  controllers: [SkillController],
  providers: [SkillService, ...SkillProvider],
})
export class SkillModule {}
