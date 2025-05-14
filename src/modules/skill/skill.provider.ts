import { repositories } from 'src/common/enums/repositories';
import { Skill } from './skill.entity';

export const SkillProvider = [
  {
    provide: repositories.skill_repository,
    useValue: Skill,
  },
];
