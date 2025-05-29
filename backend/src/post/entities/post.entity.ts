// 추후엔 DB 연동 시 @Entity() 데코레이터 설정
export class Post {
  id: number;
  title: string;
  content: string;
  authorId: number; // 유저 ID (토큰에서 추출한 값으로 설정)
  createdAt: Date;
  updatedAt: Date;
}
