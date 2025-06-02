import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
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

  async update(
    commentId: number,
    userId: number,
    updateCommentDto: UpdateCommentDto,
  ) {
    const comment = await this.commentRepo.findOne({
      where: { id: commentId },
      relations: ['user'],
    });

    if (!comment) throw new NotFoundException('댓글이 존재하지 않습니다.');
    if (comment.user.id !== userId)
      throw new ForbiddenException('수정 권한이 없습니다.');

    comment.content = updateCommentDto.content;
    return this.commentRepo.save(comment);
  }

  async remove(commentId: number, userId: number) {
    const comment = await this.commentRepo.findOne({
      where: { id: commentId },
      relations: ['user'],
    });

    if (!comment) throw new NotFoundException('댓글이 존재하지 않습니다.');
    if (comment.user.id !== userId)
      throw new ForbiddenException('삭제 권한이 없습니다.');

    return this.commentRepo.remove(comment);
  }
}
