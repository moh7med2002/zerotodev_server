import { Expose } from 'class-transformer';

export class ArticleSummaryDto {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    image:string
}