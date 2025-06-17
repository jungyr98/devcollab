// src/news/news.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import axios from 'axios';

@Injectable()
export class NewsService {
  private apiKey = process.env.HUGGINGFACE_API_KEY;
  private model = 'facebook/bart-large-cnn'; // 요약 모델
  private langModel = 'Helsinki-NLP/opus-mt-tc-big-en-ko'; // 번역 모델

  constructor(
    @InjectRepository(News)
    private newsRepo: Repository<News>,
  ) {}

  async fetchAndStoreNews(): Promise<void> {
    // dev.to API에서 최신 뉴스 5~10개 가져오기
    const { data } = await axios.get<any[]>(
      'https://dev.to/api/articles?per_page=5',
    );

    for (const article of data) {
      const exists = await this.newsRepo.findOne({
        where: { externalId: article.id.toString() },
      });
      if (exists) continue;

      // AI 내용 요약
      const summary = await this.generateSummary(
        article.description || article.title,
      );

      // AI 번역 처리
      //   const translateTitle = article.title
      //     ? await this.translateToKorean(article.title)
      //     : '';
      //   const translateSummary = summary
      //     ? await this.translateToKorean(summary)
      //     : '';

      // 중복되지 않도록 externalId로 식별
      const news = this.newsRepo.create({
        externalId: article.id.toString(),
        title: article.title,
        url: article.url,
        description: article.description,
        summary,
        source: 'devto',
      });

      // DB 저장
      await this.newsRepo.save(news);
    }
  }

  // AI 뉴스 요약
  async generateSummary(content: string): Promise<string> {
    try {
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/${this.model}`,
        { inputs: content.substring(0, 1000) },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (Array.isArray(response.data) && response.data[0]?.summary_text) {
        return response.data[0].summary_text;
      }

      throw new Error('요약 결과가 없습니다.');
    } catch (err) {
      console.error('Hugging Face 요약 실패:', err.message);
      throw err;
    }
  }

  // AI 영어 -> 한국어 번역
  async translateToKorean(text: string): Promise<string> {
    console.log('번역 내용: ', text);
    try {
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/${this.langModel}`,
        { inputs: text },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (Array.isArray(response.data) && response.data[0]?.translation_text) {
        return response.data[0].translation_text;
      }

      throw new Error('번역 결과가 없습니다.');
    } catch (err) {
      console.error('Hugging Face 번역 실패:', err.message);
      throw err;
    }
  }

  async getAllNews(): Promise<News[]> {
    return this.newsRepo.find({ order: { createdAt: 'DESC' } });
  }
}
