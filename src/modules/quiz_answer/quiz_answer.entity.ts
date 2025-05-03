import { Column, Model, Table, DataType, ForeignKey, BelongsTo, Default, AllowNull } from 'sequelize-typescript';
import { QuizQuestion } from '../quiz_question/quiz_question.entity';

@Table({ tableName: 'quiz_answers' })
export class QuizAnswer extends Model {
    @Column({ autoIncrement: true, primaryKey: true })
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    title: string;

    @AllowNull(false)
    @ForeignKey(() => QuizQuestion)
    @Column(DataType.INTEGER)
    questionId: number;

    @BelongsTo(() => QuizQuestion)
    question: QuizQuestion;

    @Default(false)
    @Column(DataType.BOOLEAN)
    isCorrect: boolean;
}
