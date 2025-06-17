// src/news/news.controller.ts
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from './entities/news.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllNews(): Promise<News[]> {
    return this.newsService.getAllNews();
  }

  @Get('/fetch-latest')
  async fetchNews(): Promise<{ message: string }> {
    await this.newsService.fetchAndStoreNews();
    return { message: 'News fetched and stored' };
  }
}
