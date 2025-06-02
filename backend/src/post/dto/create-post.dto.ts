import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  content: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}
