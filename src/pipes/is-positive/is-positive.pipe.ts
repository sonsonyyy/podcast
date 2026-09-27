import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class IsPositivePipe implements PipeTransform {
  transform(value: any) {
    if (value <= 0) {
      throw new BadRequestException('The value must be a positive number');
    }
    return value;
  }
}
