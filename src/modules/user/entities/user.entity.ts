import {
  Column,
  Model,
  Table,
  DataType,
  AllowNull,
  BelongsToMany,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Article } from 'src/modules/article/article.entity';
import { ArticleView } from 'src/modules/article_view/article_view.entity';
import { Comment } from 'src/modules/comment/comment.entity';
import { Question } from 'src/modules/question/question.entity';
import { QuestionView } from 'src/modules/question_view/question_view.entity';
import { Quiz } from 'src/modules/quiz/quiz.entity';
import { Skill } from 'src/modules/skill/skill.entity';
import { SocailMedia } from 'src/modules/social-media/social-media.entity';
import { UserPoint } from 'src/modules/user_point/user_point.entity';
import { UserQuiz } from 'src/modules/user_quiz/user_quiz.entity';
import { VerifyCode } from './UserVerifyCode';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  password: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  bio: string;

  @Column({
    type: DataType.STRING,
    defaultValue: '/images/user.png',
  })
  image: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  name: string;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  points: number;

  @AllowNull(false)
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  active: boolean;

  // Relationship: A user can prepare many quizzes
  @BelongsToMany(() => Quiz, () => UserQuiz)
  quizzes: Quiz[];

  @BelongsToMany(() => Article, () => ArticleView)
  viewedArticles: Article[];

  @BelongsToMany(() => Question, () => QuestionView)
  viewedQuestions: Question[];

  @HasMany(() => UserPoint)
  pointsHistory: UserPoint[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Skill)
  skills: Skill[];

  @HasMany(() => SocailMedia)
  socialmedias: SocailMedia[];

  @HasOne(() => VerifyCode)
  verifyCode: VerifyCode;
}
