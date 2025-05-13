import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { UserGuard } from 'src/guards/user.guard';
import { createCommentDto } from './dto/create-comment.dto';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { User } from '../user/entities/user.entity';
import { Serilaize } from 'src/common/interceptors/serialize.interceptor';
import { UserCommentDto } from './dto/use-comment.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(UserGuard)
  @Post('create')
  createComment(@Body() body: createCommentDto, @CurrentUser() user: User) {
    return this.commentService.create(body, user.id);
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  deleteComment(@CurrentUser() user: User, @Param('id') id: string) {
    return this.commentService.delete(+user.id, +id);
  }

  @UseGuards(AdminGuard)
  @Delete('admin/:id')
  deleteCommentByAdmin(@Param('id') id: string) {
    return this.commentService.deleteByAdmin(+id);
  }

  @Serilaize(UserCommentDto)
  @UseGuards(UserGuard)
  @Get('/user-all')
  getUserComments(@CurrentUser() user: User) {
    return this.commentService.getUserComments(+user.id);
  }

  @Get(':itemId')
  getComments(
  @Param('itemId') itemId: string,
  @Query('page') page: string = '1',
  @Query('limit') limit: string = '10',
  @Query('type') type: 'article' | 'question'
) {
  return this.commentService.getCommentsByItemId(+page, +limit, itemId, type);
}
}
