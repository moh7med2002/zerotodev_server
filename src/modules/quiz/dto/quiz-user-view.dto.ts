import { Expose, Type } from 'class-transformer';
import { QuizListDto } from './quizListdto';


export class QuizUserViewResponseDto {
    @Expose()
    @Type(() => QuizListDto)
    quiz: QuizListDto;

    @Expose()
    marks: number;

    @Expose()
    hasSubmitted: boolean;
}