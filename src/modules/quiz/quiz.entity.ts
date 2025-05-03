import { QuizQuestion } from '../quiz_question/quiz_question.entity';
import { User } from '../user/entities/user.entity';
import { UserQuiz } from '../user_quiz/user_quiz.entity';
import { ItemStatus } from './../../common/enums/itemStatus';
import { Column, Model, Table, DataType, HasMany, Default, AllowNull, BelongsToMany } from 'sequelize-typescript';

@Table({ tableName: 'quizzes' })
export class Quiz extends Model {
    @Column({ autoIncrement: true, primaryKey: true })
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    title: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    headline: string;

    @Default(ItemStatus.PENDING)
    @Column(DataType.ENUM(...Object.values(ItemStatus)))    
    status: string;

    @Column(DataType.DATE)
    publish_date: Date;

    @HasMany(() => QuizQuestion)
    questions: QuizQuestion[];

    @BelongsToMany(() => User, () => UserQuiz)
    users: User[];
}
