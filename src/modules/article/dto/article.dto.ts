import { Expose } from 'class-transformer';

export class ArticleDto {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    headline: string;

    @Expose()
    content: string;

    @Expose()
    image: string;

    @Expose()
    status: string;

    @Expose()
    publish_date: Date;
}