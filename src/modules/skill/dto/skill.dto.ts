import { Expose } from 'class-transformer';

export class SkillDto {
  @Expose()
  id: string;
  @Expose()
  title: string;
}
