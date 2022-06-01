import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AbonnerResponseDto } from './dto/abonner-response.dto';
import { CheckAbonnerDto } from './dto/check-abonne.dto';
import { Abonner } from './entities/abonner.entity';
import { AbonnersService } from './services/abonners.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly abonnerService: AbonnersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('checked/abonners')
  checkAbonner(@Body() body: CheckAbonnerDto): Promise<AbonnerResponseDto | 3> {
    return this.abonnerService.checkAbonner(body.idBadge);
  }
  @Post('substract/checked/byChecked/abonners')
  debitAbonner(): Abonner | 0 | any {
    // return this.appService.getHello();
  }
}
