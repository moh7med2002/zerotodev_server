import { repositories } from 'src/common/enums/repositories';
import { Comment } from './comment.entity';
export const CommentProvider = [
    {
        provide: repositories.comment_repository,
        useValue: Comment,
    },
];
