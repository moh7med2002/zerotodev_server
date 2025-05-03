import { Expose } from 'class-transformer';

export class QuestionSummaryDto {
    @Expose()
    id: number;

    @Expose()
    title: string;
}