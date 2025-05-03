import { repositories } from 'src/common/enums/repositories';
import { Category } from './category.entity';
export const CategoryProvider = [
    {
        provide: repositories.category_repository,
        useValue: Category,
    },
];
