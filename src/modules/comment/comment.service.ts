import { Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
    constructor(
        @Inject(repositories.comment_repository) private commentRepo:typeof Comment,
    ){}
}
