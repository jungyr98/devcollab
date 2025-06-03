import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    // 이메일로 DB 유저 조회
    const user = await this.usersService.findOne(loginUserDto.email);
    if (!user) throw new NotFoundException('아이디가 존재하지 않습니다.');

    // 입력 비밀번호와 DB내 해싱 비밀번호 비교
    const pwCheck = await this.comparePasswords(
      loginUserDto.password,
      user.password,
    );
    if (!pwCheck) throw new NotFoundException('비밀번호가 일치하지 않습니다.');

    // 로그인 처리 및 토큰 발급
    const payload = { email: loginUserDto.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      userInfo: { id: user.id, email: user.email, username: user.username },
      access_token: token,
    };
  }

  // hashText 값 salt 추출 > plainText & salt 다시 해싱 > 해싱된 값 & hashText 비교
  async comparePasswords(
    plainText: string,
    hashText: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainText, hashText);
  }
}
