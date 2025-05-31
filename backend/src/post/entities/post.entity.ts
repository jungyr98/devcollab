import { OneToMany, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  authorId: number; // 유저 ID (토큰에서 추출한 값으로 설정)

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
