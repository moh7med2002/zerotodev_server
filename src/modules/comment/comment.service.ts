import { ArticleService } from './../article/article.service';
import { QuestionService } from './../question/question.service';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Comment } from './comment.entity';
import { createCommentDto } from './dto/create-comment.dto';
import { ItemStatus } from 'src/common/enums/itemStatus';
import { Article } from '../article/article.entity';
import { Question } from '../question/question.entity';

@Injectable()
export class CommentService {
    constructor(
        @Inject(repositories.comment_repository) private commentRepo:typeof Comment,
        private readonly questionService:QuestionService,
        private readonly articleService:ArticleService
    ){}
    
    async create(body:createCommentDto,userId:number)
    {
        const {questionId,articleId,comment} = body
        if ((articleId && questionId) || (!articleId && !questionId)) {
            throw new BadRequestException(
                'يجب ربط الكومنت إما بمقالة أو سؤال، وليس بكليهما أو بدون أي منهما.'
            );
        }
        if(articleId)
        {
            await this.articleService.getOne(articleId,ItemStatus.PUBLISHED)
        }
        else if(questionId)
        {
            await this.questionService.getOne(questionId,ItemStatus.PUBLISHED)
        }
        await this.commentRepo.create({
            comment,
            userId,
            articleId,
            questionId,
        });
        
        return {message:"تم إضافة التعليق بنجاح"};
    }

    async delete(userId:number,commentId:number)
    {
        const comment = await this.commentRepo.findByPk(commentId)
        if(!comment || comment.userId!==userId)
        {
            throw new BadRequestException('غير مسموح لك بحذف التعليق')
        }
        await comment.destroy()
        return {message:"تم حذف التعليق"}
    }

    getUserComments(userId:number)
    {
        return this.commentRepo.findAll({
            where:{userId},
            include:[{model:Article},{model:Question}]
        }
        )
    }
}