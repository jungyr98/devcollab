import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // JWT에서 복호화된 유저 정보
  }
}
