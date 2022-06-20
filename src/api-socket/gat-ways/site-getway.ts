/* eslint-disable prettier/prettier */
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { SitesService } from 'src/principale/services/sites.service';
import { Server } from 'typeorm';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SiteGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly siteService: SitesService) {
  }

  @SubscribeMessage('createSite')
  async create(@MessageBody() createSiteDto) {

    const site =  await this.siteService.create(createSiteDto);
    // this.server.emit("passage", sum);


  }

  @SubscribeMessage('findAllSite')
  findAll() {
    return this.siteService.findAll();
  }

  @SubscribeMessage('findOneSite')
  findOne(@MessageBody() id: number) {
    return this.siteService.findOne(id);
  }

  @SubscribeMessage('updateSite')
  update(@MessageBody() updateSiteDto) {
    return this.siteService.update(updateSiteDto.id, updateSiteDto);
  }

  @SubscribeMessage('removeSite')
  remove(@MessageBody() id: number) {
    return this.siteService.remove(id);
  }
}
