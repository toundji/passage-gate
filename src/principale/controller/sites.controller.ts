/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SitesService } from 'src/principale/services/sites.service';
import { SiteCount } from '../dto/site-count.dto';
import { VoieCount } from './../dto/voie-count';

@ApiTags("Passages")

@Controller('sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Post()
  create(@Body() createSiteDto: any) {
    return this.sitesService.create(createSiteDto);
  }

  @Get()
  findAll() {
    return this.sitesService.findAll();
  }

  @Get(':site/sum-par-voie')
  someMoneyByDateAndStreetOfSite(@Param('site') site: string):Promise<VoieCount[]> {
    return this.sitesService.someMoneyByDateAndStreetOfSite(site);
  }

  @Get(':voie/sum')
  sumByStreet(@Param('voie') street: string):Promise<VoieCount>  {
    return this.sitesService.someMoneyByDateOfStreet(street);
  }

  

  @Get('sum/par-voie')
  sumStreet():Promise<VoieCount[]>  {
    return this.sitesService.someMoneyByDateAndStreet();
  }

  @Get('sum/par-site')
  sumBySite():Promise<SiteCount[]>  {
    return this.sitesService.someMoneyByDateAndSite();
  }

  
  @Get('statistique/all')
  allStatistique():Promise<SiteCount[]>  {
    return this.sitesService.getAllStatistic();
  }

  

  @Get('statistique/all')
  allStatist() {
    return this.sitesService.someMoneyByDateAndSite();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sitesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSiteDto: any) {
    return this.sitesService.update(+id, updateSiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sitesService.remove(+id);
  }
}
