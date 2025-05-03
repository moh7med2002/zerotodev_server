import { Column, DataType, Table ,Model,ForeignKey, BelongsTo, AllowNull} from "sequelize-typescript";
import { User } from "../user/entities/user.entity";
import { Article } from "../article/article.entity";
import { Question } from "../question/question.entity";
import { Quiz } from "../quiz/quiz.entity";

@Table({ tableName: 'user_point' })
export class UserPoint extends Model {
    @Column({ autoIncrement: true, primaryKey: true })
    id: number;

    @AllowNull(false)
    @Column({ type: DataType.DATE })
    date: Date;

    @AllowNull(false)
    @Column({ type: DataType.INTEGER })
    points: number;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId: number;

    @ForeignKey(() => Article)
    @Column(DataType.INTEGER)
    articleId: number;

    @ForeignKey(() => Question)
    @Column(DataType.INTEGER)
    questionId: number;

    @ForeignKey(() => Quiz)
    @Column(DataType.INTEGER)
    quizId: number;

    @Column({ type: DataType.STRING })
    activity_title: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Article)
    article: Article;

    @BelongsTo(() => Question)
    question: Question;

    @BelongsTo(() => Quiz)
    quiz: Quiz;
}
