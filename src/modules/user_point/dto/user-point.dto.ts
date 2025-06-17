import { Expose, Type } from 'class-transformer';

class RelatedEntityDto {
    @Expose()
    id: number;

    @Expose()
    title: string;
}

export class UserPointDto {
    @Expose()
    id: number;

    @Expose()
    date: Date;

    @Expose()
    points: number;

    @Expose()
    activity_title: string;

    @Expose()
    @Type(() => RelatedEntityDto)
    article?: RelatedEntityDto;

    @Expose()
    @Type(() => RelatedEntityDto)
    question?: RelatedEntityDto;

    @Expose()
    @Type(() => RelatedEntityDto)
    quiz?: RelatedEntityDto;
}