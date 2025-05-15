import { Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Skill } from './skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';

@Injectable()
export class SkillService {
  constructor(
    @Inject(repositories.skill_repository) private skillRepo: typeof Skill,
  ) {}

  async createSkill(dto: CreateSkillDto, userId: number) {
    const skill = await this.skillRepo.create({ title: dto.title, userId });
    return skill;
  }

  async deleteSkill(id: number, userId: number) {
    const skill = await this.skillRepo.findOne({ where: { id, userId } });
    return skill?.destroy();
  }

  getAllByUser(userId:number)
  {
    return this.skillRepo.findAll({where:{userId}})
  }
}
