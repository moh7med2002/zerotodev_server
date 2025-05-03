import { Column, Model, Table, DataType, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';
import { Article } from '../article/article.entity';
import { Question } from '../question/question.entity';

@Table({ tableName: 'comments' })
export class Comment extends Model {
    @Column({ autoIncrement: true, primaryKey: true })
    id: number;

    @AllowNull(false)
    @Column({ type: DataType.STRING, allowNull: false })
    comment: string;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @ForeignKey(() => Article)
    @Column(DataType.INTEGER)
    articleId: number;

    @ForeignKey(() => Question)
    @Column(DataType.INTEGER)
    questionId: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Article)
    article: Article;

    @BelongsTo(() => Question)
    question: Question;
}