import { Expose } from 'class-transformer';

export class ActionQuestionDto {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    headline: string;

    @Expose()
    content: string;

    @Expose()
    status: string;

    @Expose()
    publish_date: Date;
}