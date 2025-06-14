// skill.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class SkillService {
  private readonly skills = [
    { id: 1, name: 'JavaScript' },
    { id: 2, name: 'TypeScript' },
    { id: 3, name: 'Vue.js' },
    { id: 4, name: 'NestJS' },
    { id: 5, name: 'Docker' },
    { id: 6, name: 'Java' },
  ];

  findAll() {
    return this.skills;
  }
}
