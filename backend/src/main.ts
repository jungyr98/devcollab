import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL, // Vue
    credentials: true, // 쿠키, 인증 헤더 전송 허용
  }); // CORS 허용
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
