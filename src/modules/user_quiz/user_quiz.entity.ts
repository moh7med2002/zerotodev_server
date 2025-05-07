import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';
import { Quiz } from '../quiz/quiz.entity';

@Table({ tableName: 'user_quiz' })
export class UserQuiz extends Model {
    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => Quiz)
    @Column(DataType.INTEGER)
    quizId: number;

    @BelongsTo(() => Quiz)
    quiz: Quiz;

    @Column(DataType.INTEGER)
    mark: number;

    @Column(DataType.INTEGER)
    total: number;
}
