import { Exclude, Expose, Type } from 'class-transformer';

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
  @Type(() => PointsHistoryDto)
  pointsHistory: PointsHistoryDto[];

  @Expose()
  @Type(() => QuizWithUserQuizDto)
  quizzes: QuizWithUserQuizDto[];
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
