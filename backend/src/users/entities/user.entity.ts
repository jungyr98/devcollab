import {
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
} from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // @BeforeInsert -> TypeORM에서 제공하는 라이프사이클 이벤트
  // 유저를 저장하기 전에 password를 자동으로 해싱
  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  @OneToMany(() => Comment, (comment) => comment.user)
  comments?: Comment[];
}
