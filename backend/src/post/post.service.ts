import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  private posts: CreatePostDto[] = [];
  private idCounter = 1;

  create(createPostDto: CreatePostDto) {
    const newPost = {
      ...createPostDto,
      id: this.idCounter++,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.posts.push(newPost);
    return newPost;
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    const post = this.posts.find((p) => p.id === id);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto, userId: number) {
    const post = this.findOne(id);
    if (post.authorId !== userId) {
      throw new ForbiddenException('You are not the author of this post');
    }
    Object.assign(post, updatePostDto, { updatedAt: new Date() });
    return post;
  }

  remove(id: number, userId: number) {
    const postIndex = this.posts.findIndex((p) => p.id === id);
    if (postIndex === -1) throw new NotFoundException('Post not found');

    const post = this.posts[postIndex];
    if (post.authorId !== userId) {
      throw new ForbiddenException('You are not the author of this post');
    }

    this.posts.splice(postIndex, 1);
    return { message: 'Post deleted' };
  }
}
