import {
  OneToMany,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';

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

  @Column({ nullable: true })
  gitHubLink: string;

  @Column({ nullable: true })
  serviceLink: string;

  @Column('int', { array: true, nullable: true })
  tagGroup: number[]; // 태그 ID를 배열로 저장

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'authorId' })
  userInfo: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
