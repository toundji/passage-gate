/* eslint-disable prettier/prettier */
import { Injectable, Post } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

}
