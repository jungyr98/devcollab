import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepo.create(createUserDto);
    return this.userRepo.save(newUser); // @BeforeInsert 비밀번호 해싱 hook 실행
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find({ order: { id: 'DESC' } });
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userRepo.findOne({ where: { email: email } });
    if (!user) throw new NotFoundException('아아디가 존재하지 않습니다.');
    return user;
  }
}
