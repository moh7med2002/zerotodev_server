import {Column,Model,Table,DataType,ForeignKey,BelongsTo,HasMany, AllowNull, Default, BelongsToMany,} from 'sequelize-typescript';
import { ItemStatus } from 'src/common/enums/itemStatus';
import { Category } from '../category/category.entity';
import { Comment } from '../comment/comment.entity';
import { User } from '../user/entities/user.entity';
import { ArticleView } from '../article_view/article_view.entity';

@Table({ tableName: 'articles' })
export class Article extends Model {
    @Column({ autoIncrement: true, primaryKey: true })
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    title: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    content: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    headline: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    image: string;

    @AllowNull(false)
    @ForeignKey(() => Category)
    @Column(DataType.INTEGER)
    categoryId: number;

    @BelongsTo(() => Category)
    category: Category;

    @Default(ItemStatus.PENDING)
    @Column(DataType.ENUM(...Object.values(ItemStatus)))
    status: string;

    @Column(DataType.DATE)
    publish_date: Date;

    @Default(0)
    @Column(DataType.INTEGER)
    views: number;

    @HasMany(() => Comment)
    comments: Comment[];

    @BelongsToMany(() => User, () => ArticleView)
    viewedArticles: User[];
}  