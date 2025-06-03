import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';

@Controller('post')
@UseGuards(JwtAuthGuard) // 모든 라우트 보호
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @User('id') id: number) {
    return this.postService.create({ ...createPostDto, authorId: id });
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @User('id') userId: number,
  ) {
    return this.postService.update(+id, userId, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User('id') userId: number) {
    return this.postService.remove(+id, userId);
  }
}
