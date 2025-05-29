export class User {
  id: number;
  username: string;
  email: string;
  password: string; // 실제에선 해시 필요, 일단은 평문으로
}
