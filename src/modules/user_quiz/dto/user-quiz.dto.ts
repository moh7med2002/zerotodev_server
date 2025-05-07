import { Expose, Type } from 'class-transformer';

class RelatedEntityDto {
    @Expose()
    id: number;

    @Expose()
    title: string;
}

export class UserQuizDto {
    @Expose()
    id: number;

    @Expose()
    mark: number;

    @Expose()
    total: number;

    @Expose()
    @Type(() => RelatedEntityDto)
    quiz: RelatedEntityDto;
} 