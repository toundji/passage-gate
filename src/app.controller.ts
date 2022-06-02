import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AbonnerResponseDto } from './dto/abonner-response.dto';
import { CheckAbonnerDto } from './dto/check-abonne.dto';
import { Abonner } from './entities/abonner.entity';
import { AbonnersService } from './services/abonners.service';
import { PassageDto } from './dto/passage.dto';
import { SitesService } from 'src/services/sites.service';
import { Site } from './entities/site.entity';

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
  checkAbonner(
    @Body() body: CheckAbonnerDto,
  ): Promise<AbonnerResponseDto | 3 | 0> {
    return this.abonnerService.checkAbonner(body.idBadge);
  }
  @Post('substract/checked/byChecked/abonners')
  debitAbonner(@Body() body: PassageDto): Promise<1 | 0 | 2> {
    return this.abonnerService.abonnerPasse(body);
  }
}
