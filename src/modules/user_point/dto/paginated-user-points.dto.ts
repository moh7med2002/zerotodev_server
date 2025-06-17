import { Expose,Type } from 'class-transformer';
import { UserPointDto } from './user-point.dto';

export class PaginatedUserPointsDto {
    @Expose()
    @Type(() => UserPointDto)
    points: UserPointDto[];

    @Expose()
    totalPages: number;
}