import { Expose, Type } from 'class-transformer';

export class AnswerDto {
    @Expose()
    id: number;

    @Expose()
    title: string;
}

export class QuestionDto {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    @Type(() => AnswerDto)
    answers: AnswerDto[];
}

export class QuizWithQuestionsDto {
    @Expose()
    id: number;

    @Expose()
    @Type(() => QuestionDto)
    questions: QuestionDto[];
}
