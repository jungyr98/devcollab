import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const newPost = {
      ...createPostDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.postRepo.save(newPost);
  }

  async findAllWithPagination(params: {
    page: number;
    limit: number;
    keyword?: string;
  }) {
    const { page, limit, keyword } = params;

    const [items, totalCount] = await this.postRepo.findAndCount({
      where: keyword
        ? [{ title: ILike(`%${keyword}%`) }, { content: ILike(`%${keyword}%`) }]
        : undefined,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items,
      totalCount,
      currentPage: page,
    };
    //return this.postRepo.find({ order: { createdAt: 'DESC' } });
  }

  findOne(id: number) {
    const post = this.postRepo.findOne({
      where: { id: id },
    });
    return post;
  }

  async update(id: number, userId: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);
    if (!post) throw new NotFoundException('게시글이 존재하지 않습니다.');
    if (post.authorId !== userId) {
      throw new ForbiddenException('수정 권한이 없습니다.');
    }
    post.title = updatePostDto.title;
    post.content = updatePostDto.content;
    post.updatedAt = new Date();
    return this.postRepo.save(post);
  }

  async remove(id: number, userId: number) {
    const post = await this.findOne(id);
    if (!post) throw new NotFoundException('게시글이 존재하지 않습니다.');
    if (post.authorId !== userId) {
      throw new ForbiddenException('삭제 권한이 없습니다.');
    }

    return this.postRepo.remove(post);
  }
}
