import { Expose } from 'class-transformer';

export class DetailedQuestionDto {
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

    @Expose()
    views: number;

    @Expose()
    commentCount: number;
}
