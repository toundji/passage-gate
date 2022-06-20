import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { response } from 'express';
import { Server } from 'socket.io';
import { AbonnersService } from 'src/principale/services/abonners.service';
import { SitesService } from 'src/principale/services/sites.service';
import { PassageDto } from './../../principale/dto/passage.dto';
import { SiteCount } from './../../principale/dto/site-count.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'passages',
})
export class PassageGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly siteService: SitesService,
    private readonly abonnerService: AbonnersService,
  ) {}

  @SubscribeMessage('create')
  async create(@MessageBody() body: PassageDto) {
    console.log(body);
    const reponse: number = await this.abonnerService.abonnerPasse(body);
    console.log('result ..', reponse);
    if (reponse != 1) return reponse;

    this.server.emit(`passage-de-${body.site}-voie-${body.voie}`, body);

    return reponse;
  }

  @SubscribeMessage('findAll')
  findAll(): Promise<SiteCount[]> {
    return this.siteService.getAllStatistic();
  }

  @SubscribeMessage('findOne')
  findOne(@MessageBody() id: number) {
    return this.abonnerService.findOne(id);
  }

  @SubscribeMessage('update')
  update(@MessageBody() updateAbonnerDto) {
    return this.abonnerService.update(updateAbonnerDto.id, updateAbonnerDto);
  }

  @SubscribeMessage('remove')
  remove(@MessageBody() id: number) {
    return this.abonnerService.remove(id);
  }
}
