import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  content: string;
  gitHubLink: string;
  serviceLink: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}
