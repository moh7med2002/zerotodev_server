import { Exclude, Expose, Type } from 'class-transformer';
import { SkillDto } from 'src/modules/skill/dto/skill.dto';
import { SocialMediaDto } from 'src/modules/social-media/dto/social-media.dto';

export class UserQuiz {
  @Expose()
  mark: number;
  @Expose()
  total: number;
}

@Exclude()
export class AdminUserProfileDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  image: string;

  @Expose()
  bio: string;

  @Expose()
  points: number;

  @Expose()
  createdAt: Date;

  @Expose()
  active: Boolean;

  @Expose()
  @Type(() => PointsHistoryDto)
  pointsHistory: PointsHistoryDto[];

  @Expose()
  @Type(() => QuizWithUserQuizDto)
  quizzes: QuizWithUserQuizDto[];

  @Expose()
  @Type(() => SkillDto)
  skills: SkillDto[];

  @Expose()
  @Type(() => SocialMediaDto)
  socialmedias: SocialMediaDto[];
}

@Exclude()
export class PointsHistoryDto {
  @Expose()
  id: number;

  @Expose()
  date: Date;

  @Expose()
  points: number;

  @Expose()
  activity_title: string;
}

@Exclude()
export class QuizWithUserQuizDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  headline: string;

  @Expose()
  @Type(() => UserQuiz)
  UserQuiz: UserQuiz;
}
