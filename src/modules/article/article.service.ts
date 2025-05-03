import { ArticleViewService } from './../article_view/article_view.service';
import { CategoryService } from './../category/category.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Article } from './article.entity';
import { createArtcileDto } from './dto/create-article.dto';
import { Category } from '../category/category.entity';
import { Comment } from '../comment/comment.entity';
import { User } from '../user/entities/user.entity';
import { UserPointService } from '../user_point/user_point.service';
import { removeImage } from 'src/common/utils/removeImage';

@Injectable()
export class ArticleService {
    constructor(
        @Inject(repositories.article_repository) private articleRepo:typeof Article,
        private categoryService:CategoryService,
        private userPointService:UserPointService,
        private articleViewService:ArticleViewService
    ){}

    async create(body:createArtcileDto)
    {
        const {categoryId} = body
        await this.categoryService.findOne(+categoryId)
        const article = await this.articleRepo.create({ ...body });
        return article;
    }

    async getAll(page: number, limit: number, status: string, categoryId?: string) {
        const offset = (page - 1) * limit;
        const { rows, count } = await this.articleRepo.findAndCountAll({
            where: {
                ...(categoryId && { categoryId }),
                status,
            },
            include: [{
                model: Category,
                attributes: ['id', 'name'],
            }],
            limit,
            offset,
            order: [['publish_date', 'DESC']],
            attributes: ['id', 'image', 'title', 'headline', 'publish_date', 'views'],
        });  
        return {
            articles: rows,
            totalPages: Math.ceil(count / limit),
        };
    }

    getLatest(limit:number,status: string)
    {
        return this.articleRepo.findAll({
            where:{status},
            order: [['publish_date', 'DESC']],
            limit,
            attributes:['id','title','image']
        })
    }

    getRandom(limit: number, status: string) {
        return this.articleRepo.findAll({
            where: { status },
            order: this.articleRepo.sequelize?.random(),
            limit,
            attributes: ['id', 'title', 'image'],
        });
    }

    async getOne(id:number,status:string)
    {
        const article = await this.articleRepo.findOne({
            where:{id,status},
            include:[{
                model:Comment,
                attributes:['id','comment','createdAt'],
                include:[{
                    model:User,
                    attributes:['id','name']
                }]
            },{
                model:Category,
                attributes:['id','name']
            }],
            attributes: ['id', 'image', 'title', 'headline', 'publish_date', 'views','content']
        })
        if(!article)
        {
            throw new NotFoundException("المقالة غير متوفرة")
        }
        return article
    }
    
    async getOneWithTracking(id: number, user: User | null, ip: string,status:string)
    {
        const article = await this.getOne(id,status);
        const alreadyViewed = await this.articleViewService.registerView(id, user, ip);
        if (!alreadyViewed) {
            article.views ++ ;
            article.save()
            if (user) {
                await this.userPointService.givePointForArticleRead(user.id, id);
            }
        }
        return article
    }

    async update(id: number, attrs: Partial<Article>, newImage?: string)
    {
        const article = await this.articleRepo.findByPk(id);
        if (!article) {
            throw new NotFoundException('المقالة غير موجودة');
        }
        if(attrs.categoryId)
        {
            await this.categoryService.findOne(+attrs.categoryId);
        }
        if (newImage && article.image) {
            await removeImage(article.image);
            attrs.image = newImage;
        }
        Object.assign(article, attrs);
        await article.save();
        return article;
    }
}
