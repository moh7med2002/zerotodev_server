import { Expose } from 'class-transformer';

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
    created_at: Date;

    @Expose()
    user: CommentUserDto;
}