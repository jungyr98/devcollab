import {
  Controller,
  Post,
  UseGuards,
  Param,
  Body,
  Request,
  Get,
  Req,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/common/decorators/user.decorator';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('posts/:postId/comments')
  create(
    @Param('postId') postId: number,
    @Body() createCommentDto: CreateCommentDto,
    @User('id') userId: number,
  ) {
    return this.commentsService.create(postId, userId, createCommentDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('posts/:postId/comments')
  findAll(@Param('postId') postId: number) {
    return this.commentsService.findAllByPost(+postId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('comment/:commentId')
  update(
    @Param('commentId') commentId: number,
    @Req() req,
    @Body() updateDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(commentId, req.user.id, updateDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('comment/:commentId')
  remove(@Param('commentId') commentId: number, @Req() req) {
    return this.commentsService.remove(commentId, req.user.id);
  }
}
