import { Column, Model, Table, ForeignKey, DataType, BelongsTo, AllowNull } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';
import { Question } from '../question/question.entity';

@Table({ tableName: 'question_views' })
export class QuestionView extends Model {
    @Column({ autoIncrement: true, primaryKey: true })
    id: number;

    @AllowNull(true)
    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @AllowNull(false)
    @ForeignKey(() => Question)
    @Column(DataType.INTEGER)
    questionId: Question;

    @BelongsTo(() => Question)
    question: Question;

    @AllowNull(true)
    @Column(DataType.STRING)
    ip: string;
}
