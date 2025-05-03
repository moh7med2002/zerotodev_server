import { Expose } from 'class-transformer';

export class SimplifiedQuestionDto {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    headline: string;

    @Expose()
    status: string;

    @Expose()
    publish_date: Date;

    @Expose()
    views: number;
}
