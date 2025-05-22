import { Expose, Type } from 'class-transformer';
import { CommentDto } from 'src/modules/comment/dto/comment.dto';

export class DetailedQuestionDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  headline: string;

  @Expose()
  content: string;

  @Expose()
  status: string;

  @Expose()
  publish_date: Date;

  @Expose()
  views: number;

  @Expose()
  commentCount: number;

  @Expose()
  @Type(() => CommentDto)
  comments: CommentDto[];
}
