import {
  Controller,
  Post,
  UseGuards,
  Param,
  Body,
  Request,
  Get,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Param('postId') postId: number,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req, // user 정보 포함돼 있다고 가정
  ) {
    const userId = req.user.id;
    return this.commentsService.create(postId, userId, createCommentDto);
  }

  @Get()
  findAll(@Param('postId') postId: number) {
    return this.commentsService.findAllByPost(+postId);
  }
}
