import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const loginUserInfo = this.authService.login(loginUserDto);
    if (!loginUserInfo) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return loginUserInfo;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // JWT에서 복호화된 유저 정보
  }
}
