import { Expose, Type } from 'class-transformer';

export class QuizListDto {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    headline: string;

    @Expose({ name: 'quistionCount' })
    questionCount: number;
}

export class QuizListResponseDto {
    @Expose()
    @Type(() => QuizListDto)
    quizes: QuizListDto[];

    @Expose()
    totalPages: number;
}