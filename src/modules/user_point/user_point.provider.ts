import { UserPoint } from './user_point.entity';
import { repositories } from 'src/common/enums/repositories';
export const UserPointProvider = [
    {
        provide: repositories.user_point_repository,
        useValue: UserPoint,
    },
];
