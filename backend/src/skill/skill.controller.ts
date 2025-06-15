// skill.controller.ts
import { Controller, Get } from '@nestjs/common';
import { SkillService } from './skill.service';
import { Skill } from './entities/skill.entity';

@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  async getSkills(): Promise<Skill[]> {
    return this.skillService.findAll();
  }
}
