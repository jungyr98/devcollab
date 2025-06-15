import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseArrayQueryPipe implements PipeTransform {
  constructor(private readonly toNumber = false) {}

  transform(value: any): any[] {
    if (value === undefined || value === null) return [];

    if (Array.isArray(value)) {
      return this.toNumber ? value.map((v) => Number(v)) : value;
    }

    // 단일 값일 경우 배열로 변환
    const singleValue = this.toNumber ? Number(value) : value;

    // 숫자인 경우, NaN 체크
    if (this.toNumber && isNaN(singleValue)) {
      throw new BadRequestException('Invalid number in query parameter');
    }

    return [singleValue];
  }
}
