import { Expose, Type } from 'class-transformer';
import { CategoryDto } from 'src/modules/category/dto/category.dto';
import { CommentDto } from 'src/modules/comment/dto/comment.dto';

export class DetailedArticleDto {
  @Expose()
  id: number;

  @Expose()
  image: string;

  @Expose()
  title: string;

  @Expose()
  headline: string;

  @Expose()
  publish_date: Date;

  @Expose()
  views: number;

  @Expose()
  content: string;

  @Expose()
  status: string;

  @Expose()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @Expose()
  commentCount: number;

  @Expose()
  @Type(() => CommentDto)
  comments: CommentDto[];
}
