import {
  OneToMany,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Skill } from 'src/skill/entities/skill.entity';

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

  // @Column('int', { array: true, nullable: true })
  // tagGroup: number[]; // 태그 ID를 배열로 저장

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToMany(() => Skill, { cascade: true, eager: true })
  @JoinTable({
    name: 'post_skills', // 조인 테이블 이름 (생략 시 자동 생성)
    joinColumn: { name: 'post_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'skill_id', referencedColumnName: 'id' },
  })
  skills: Skill[];

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'authorId' })
  userInfo: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
