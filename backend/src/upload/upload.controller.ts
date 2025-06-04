import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      // 파일 확장자 제한
      fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const ext = extname(file.originalname).toLowerCase();
        if (allowedTypes.test(ext)) {
          cb(null, true);
        } else {
          cb(new Error('지원하지 않는 이미지 형식입니다.'), false);
        }
      },
      // 파일 크기 제한
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB 제한
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      imageUrl: `/uploads/${file.filename}`,
    };
  }
}
