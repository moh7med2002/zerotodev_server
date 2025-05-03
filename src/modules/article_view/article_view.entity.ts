import { Column, Model, Table, ForeignKey, DataType, BelongsTo, AllowNull } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';
import { Article } from '../article/article.entity';

@Table({ tableName: 'article_views' })
export class ArticleView extends Model {
    @Column({ autoIncrement: true, primaryKey: true })
    id: number;

    @AllowNull(true)
    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @AllowNull(false)
    @ForeignKey(() => Article)
    @Column(DataType.INTEGER)
    articleId: number;

    @BelongsTo(() => Article)
    article: Article;

    @AllowNull(true)
    @Column(DataType.STRING)
    ip: string;
}
