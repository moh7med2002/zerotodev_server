import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Question } from './question.entity';
import { createQuestionDto } from './dto/createQuestion.dto';
import { Comment } from '../comment/comment.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class QuestionService {
    constructor(
        @Inject(repositories.question_repository) private questionRepo:typeof Question,
    ){}
    async create(body:createQuestionDto)
    {
        const question = await this.questionRepo.create({...body})
        await question.save()
        return question ;
    }

    async update(attrs:Partial<createQuestionDto>,id:number)
    {
        const question = await this.findbyId(id)
        if(!question)
        {
            throw new NotFoundException('السؤال غير متوفر')
        } 
        Object.assign(question,attrs)
        return question 
    }

    findbyId(id:number)
    {
        return this.questionRepo.findByPk(id)
    }

    findAll()
    {
        return this.questionRepo.findAll({
            include:[{
                model:Comment,
                include:[
                    {model:User}
                ]
            }]
        })
    }

    getLatest(limit:number,status: string)
    {
        return this.questionRepo.findAll({
            where:{status},
            order: [['publish_date', 'DESC']],
            limit,
        })
    }

    getRandom(limit: number, status: string) {
        return this.questionRepo.findAll({
            where: { status },
            order: this.questionRepo.sequelize?.random(),
            limit,
        });
    }
}