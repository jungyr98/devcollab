import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS 설정
  app.enableCors({
    origin: process.env.FRONTEND_URL, // Vue
    credentials: true, // 쿠키, 인증 헤더 전송 허용
  });

  // 정적 폴더 서빙 설정
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
