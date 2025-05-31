import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(
    postId: number,
    userId: number,
    createCommentDto: CreateCommentDto,
  ) {
    const post = await this.postRepo.findOneBy({ id: postId });
    const user = await this.userRepo.findOneBy({ id: userId });

    if (!post || !user) throw new NotFoundException();

    const comment: Comment = this.commentRepo.create({
      ...createCommentDto,
      post,
      user,
    });

    return this.commentRepo.save(comment);
  }

  async findAllByPost(postId: number) {
    return this.commentRepo.find({
      where: { post: { id: postId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }
}
