import {Column,Model,Table,DataType,HasMany, AllowNull, Default, BelongsToMany,} from 'sequelize-typescript';
import { ItemStatus } from 'src/common/enums/itemStatus';
import { User } from '../user/entities/user.entity';
import { Comment } from '../comment/comment.entity';
import { QuestionView } from '../question_view/question_view.entity';

@Table({ tableName: 'questions' })
export class Question extends Model {
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

    @BelongsToMany(() => User, () => QuestionView)
    viewedQuestions: User[];
}