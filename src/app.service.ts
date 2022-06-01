/* eslint-disable prettier/prettier */
import { Body, Injectable, Post } from '@nestjs/common';
import { Abonner } from './entities/abonner.entity';
import { AbonnersService } from 'src/services/abonners.service';
import { CheckAbonnerDto } from './dto/check-abonne.dto';

@Injectable()
export class AppService {
  constructor(
    private abonnerService: AbonnersService,
  ){}

  getHello(): string {
    return 'Hello World!';
  }

}
