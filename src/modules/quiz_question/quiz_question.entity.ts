import { Column, Model, Table, DataType, HasMany, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
import { Quiz } from '../quiz/quiz.entity';
import { QuizAnswer } from '../quiz_answer/quiz_answer.entity';

@Table({ tableName: 'quiz_questions' })
export class QuizQuestion extends Model {
    @Column({ autoIncrement: true, primaryKey: true })
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    title: string;

    @AllowNull(false)
    @ForeignKey(() => Quiz)
    @Column(DataType.INTEGER)
    quizId: number;

    @BelongsTo(() => Quiz)
    quiz: Quiz;

    @HasMany(() => QuizAnswer)
    answers: QuizAnswer[];
}
