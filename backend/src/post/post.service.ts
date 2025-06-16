import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Repository, ILike, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Skill } from 'src/skill/entities/skill.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
    @InjectRepository(Skill)
    private skillRepo: Repository<Skill>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const { tagGroup, ...postData } = createPostDto;

    const skills = await this.skillRepo.findBy({
      id: In(tagGroup), // [1, 2, 3]
    });

    const newPost = {
      ...createPostDto,
      skills: skills,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.postRepo.save(newPost);
  }

  async findAllWithPagination(params: {
    page: number;
    limit: number;
    keyword?: string;
    tagGroup?: number[];
  }) {
    const { page, limit, keyword, tagGroup } = params;
    const offset = (page - 1) * limit;

    const query = this.postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.skills', 'skill')
      .leftJoinAndSelect('post.userInfo', 'userInfo')
      .select([
        'post.id',
        'post.title',
        'post.content',
        'post.createdAt',
        'post.gitHubLink',
        'post.serviceLink',
        'userInfo.id',
        'userInfo.username',
        // 필요한 post, userInfo 컬럼 나열
      ])
      .addSelect(
        `COALESCE(json_agg(skill) FILTER (WHERE skill.id IS NOT NULL), '[]')`,
        'skills',
      ) // 스킬들을 JSON 배열로 집계
      .groupBy('post.id')
      .addGroupBy('userInfo.id');

    // 스킬 ID 배열 필터링 (tagGroup이 있으면)
    if (tagGroup && tagGroup.length > 0) {
      //query.andWhere('skill.id IN (:...tagGroup)', { tagGroup });
      query.andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('post.id')
          .from(Post, 'post')
          .innerJoin('post.skills', 's')
          .where('s.id IN (:...tagGroup)', { tagGroup })
          .groupBy('post.id')
          .having('COUNT(DISTINCT s.id) = :count', { count: tagGroup.length }) // 스킬 모두 해당해야함
          .getQuery();
        return `post.id IN ${subQuery}`;
      });
    }

    // 키워드 검색 (title or content)
    if (keyword) {
      query.andWhere('(post.title ILIKE :kw OR post.content ILIKE :kw)', {
        kw: `%${keyword}%`,
      });
    }

    query.orderBy('post.createdAt', 'DESC').skip(offset).take(limit);

    const totalCount = await query.getCount();
    const rawPosts = await query.getRawMany();
    const items = rawPosts.map((row) => ({
      id: row.post_id,
      title: row.post_title,
      content: row.post_content,
      createdAt: row.post_createdAt,
      gitHubLink: row.post_gitHubLink,
      serviceLink: row.post_serviceLink,
      userInfo: {
        id: row.userInfo_id,
        username: row.userInfo_username,
      },
      skills: row.skills,
    }));

    return {
      items,
      totalCount,
      currentPage: page,
    };
  }

  findOne(id: number) {
    const post = this.postRepo.findOne({
      where: { id: id },
      relations: ['skills'], // 기존 skills도 같이 로드
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
    post.gitHubLink = updatePostDto.gitHubLink;
    post.serviceLink = updatePostDto.serviceLink;
    post.updatedAt = new Date();

    if (updatePostDto.tagGroup && Array.isArray(updatePostDto.tagGroup)) {
      // skillIds: number[] 형태라고 가정
      const skills = await this.skillRepo.findBy({
        id: In(updatePostDto.tagGroup),
      });
      post.skills = skills;
    }

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
