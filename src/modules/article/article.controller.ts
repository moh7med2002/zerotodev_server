import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { createArtcileDto } from './dto/create-article.dto';
import { Serilaize } from 'src/common/interceptors/serialize.interceptor';
import { createImageInterceptor } from 'src/common/interceptors/createImage.interceptor';
import { ItemStatus } from 'src/common/enums/itemStatus';
import { OptionalUserGuard } from 'src/guards/optionalUser.guard';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { User } from '../user/entities/user.entity';
import { MulterExceptionFilter } from 'src/common/filters/multerException.filter';
import { ArticleSummaryDto } from './dto/article-summary.dto';
import { DetailedArticleDto } from './dto/detailed-article.dto';
import { AactionArticleDto } from './dto/action-article';
import { UpdateArtcileStatusDto } from './dto/update-article-status.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Serilaize(AactionArticleDto)
  @UseGuards(AdminGuard)
  @Post('create')
  @UseInterceptors(createImageInterceptor('image', 'images'))
  @UseFilters(MulterExceptionFilter)
  createArticle(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: createArtcileDto,
  ) {
    const imageUrl = `/images/${file.filename}`;
    return this.articleService.create({ ...body, image: imageUrl });
  }

  @Serilaize(AactionArticleDto)
  @UseGuards(AdminGuard)
  @Put(':id')
  @UseInterceptors(createImageInterceptor('image', 'images'))
  @UseFilters(MulterExceptionFilter)
  updateArticle(
    @Param('id') id: string,
    @Body() body: Partial<createArtcileDto>,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const imageUrl = file ? `/images/${file.filename}` : undefined;
    return this.articleService.update(+id, body, imageUrl);
  }

  @Get('all')
  getArticles(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
    @Query('category') categoryId?: string,
  ) {
    return this.articleService.getAll(
      +page,
      +limit,
      ItemStatus.PUBLISHED,
      categoryId,
    );
  }

  @Get('admin/all')
  getArticlesForAdmin(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
    @Query('status') status: string = ItemStatus.PUBLISHED,
    @Query('category') categoryId?: string,
  ) {
    return this.articleService.getAll(+page, +limit, status, categoryId);
  }

  @Serilaize(ArticleSummaryDto)
  @Get('latest')
  getLatestArticles(@Query('limit') limit: string = '3') {
    return this.articleService.getLatest(+limit, ItemStatus.PUBLISHED);
  }

  @Serilaize(ArticleSummaryDto)
  @Get('random')
  getRandomArticles(@Query('limit') limit: string = '3') {
    return this.articleService.getRandom(+limit, ItemStatus.PUBLISHED);
  }

  @Serilaize(DetailedArticleDto)
  @UseGuards(OptionalUserGuard)
  @Get(':id')
  getSingleArticle(@Param('id') id:string,@CurrentUser() user:User | null,@Req() req)
  {
    console.log(user)
    return this.articleService.getOneWithTracking(+id, user, req.ip,ItemStatus.PUBLISHED);
  }

  @UseGuards(AdminGuard)
  @Get('/admin/:articleId')
  getArticleDetailForAdmin(@Param('articleId') articleId: string) {
    return this.articleService.getOne(+articleId);
  }

  @UseGuards(AdminGuard)
  @Patch('/update/:articleId/status')
  updateArticleStatus(
    @Body() dto: UpdateArtcileStatusDto,
    @Param('articleId') articleId: string,
  ) {
    return this.articleService.updateStatus(dto, +articleId);
  }
}
