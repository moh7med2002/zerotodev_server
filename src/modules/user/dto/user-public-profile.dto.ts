import { Expose, Type } from 'class-transformer';
import { SkillDto } from 'src/modules/skill/dto/skill.dto';
import { SocialMediaDto } from 'src/modules/social-media/dto/social-media.dto';

export class UserPublicProfileDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  bio: string;

  @Expose()
  image: string;

  @Expose()
  points: number;

  @Expose()
  createdAt: Date;

  @Expose()
  commentsCount: number;

  @Expose()
  articlesViewed: number;

  @Expose()
  questionsViewed: number;

  @Expose()
  pointsHistoryCount: number;

  @Expose()
  @Type(() => SkillDto)
  skills: SkillDto[];

  @Expose()
  @Type(() => SocialMediaDto)
  socialmedias: SocialMediaDto[];
}
