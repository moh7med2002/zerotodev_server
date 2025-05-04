import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Category } from './category.entity';
import { createCategoryDto } from './dto/create-category.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(repositories.category_repository)
    private categoryRepo: typeof Category,
  ) {}
  async create(body: createCategoryDto) {
    const { name } = body;
    await this.checkUniqueName(name);
    const newCategory = await this.categoryRepo.create({
      name: name.toLowerCase(),
    });
    await newCategory.save();
    return newCategory;
  }

  async update(body: createCategoryDto, id: number) {
    const { name } = body;
    const category = await this.findOne(id);
    await this.checkUniqueName(name);
    category.name = name.toLowerCase();
    await category.save();
    return category;
  }

  findAllByAdmin() {
    return this.categoryRepo.findAll({
      attributes: {
        include: [
          [
            Sequelize.literal(`(
                  SELECT COUNT(*) 
                  FROM articles AS a 
                  WHERE a.categoryId = Category.id
                )`),
            'articleCount',
          ],
        ],
      },
    });
  }

  findAll() {
    return this.categoryRepo.findAll();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findByPk(id);
    if (!category) {
      throw new NotFoundException('القسم غير متوفر');
    }
    return category;
  }

  async checkUniqueName(name: string) {
    const categoryByName = await this.categoryRepo.findOne({
      where: { name: name.toLowerCase() },
    });
    if (categoryByName) {
      throw new BadRequestException('الاسم مستخدم من قبل');
    }
    return true;
  }
}
