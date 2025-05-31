import { Entity, OneToMany, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // 실제에선 해시 필요, 일단은 평문으로

  @OneToMany(() => Comment, (comment) => comment.user)
  comments?: Comment[];
}
