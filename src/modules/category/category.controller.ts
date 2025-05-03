import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { createCategoryDto } from './dto/create-category.dto';
import { Serilaize } from 'src/common/interceptors/serialize.interceptor';
import { CategoryDto } from './dto/category.dto';

@Serilaize(CategoryDto)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AdminGuard)
  @Post('create')
  createCategory(@Body() body: createCategoryDto) {
    return this.categoryService.create(body);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  updateCategory(@Body() body: createCategoryDto, @Param('id') id: string) {
    return this.categoryService.update(body, +id);
  }

  @UseGuards(AdminGuard)
  @Get('/admin/all')
  async getCategoriesForAdmin() {
    return this.categoryService.findAllByAdmin();
  }

  @UseGuards(AdminGuard)
  @Get('/admin/:categoryId')
  async getSingleCategoryForAdmin(@Param('categoryId') categoryId: string) {
    return this.categoryService.findOne(+categoryId);
  }

  @Get('all')
  getCategories() {
    return this.categoryService.findAll();
  }
}
