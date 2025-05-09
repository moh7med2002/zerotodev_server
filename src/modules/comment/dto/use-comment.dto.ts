import { Expose, Type } from 'class-transformer';

class RelatedEntityDto {
    @Expose()
    id: number;

    @Expose()
    title: string;
}

    export class UserCommentDto {
    @Expose()
    id: number;

    @Expose()
    createdAt: string;

    @Expose()
    comment: string;

    @Expose()
    @Type(() => RelatedEntityDto)
    article?: RelatedEntityDto;

    @Expose()
    @Type(() => RelatedEntityDto)
    question?: RelatedEntityDto;
} 