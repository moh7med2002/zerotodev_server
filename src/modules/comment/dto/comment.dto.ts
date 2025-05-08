import { Expose, Type } from 'class-transformer';

export class CommentUserDto {
    @Expose()
    id: number;

    @Expose()
    name: string;
}

export class CommentDto {
    @Expose()
    id: number;

    @Expose()
    comment: string;

    @Expose()
    createdAt: string;

    @Expose()
    @Type(() => CommentUserDto)
    user: CommentUserDto;
}