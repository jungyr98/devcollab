import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    // 예시니까 간단하게 처리
    if (body.username === 'test' && body.password === '1234') {
      return this.authService.login({ username: body.username, id: 1 });
    }
    return { message: 'Invalid credentials' };
  }
}
