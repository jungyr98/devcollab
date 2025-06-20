import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsString()
  content: string;

  gitHubLink: string;
  serviceLink: string;
  tagGroup: number[];
}
