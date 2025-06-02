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

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Param('postId') postId: number,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.commentsService.create(postId, userId, createCommentDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Param('postId') postId: number) {
    return this.commentsService.findAllByPost(+postId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:commentId')
  update(
    @Param('commentId') commentId: number,
    @Req() req,
    @Body() updateDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(commentId, req.user.id, updateDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:commentId')
  remove(@Param('commentId') commentId: number, @Req() req) {
    return this.commentsService.remove(commentId, req.user.id);
  }
}
