/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Site } from 'src/entities/site.entity';
import { Repository } from 'typeorm';
import { PassageDto } from './../dto/passage.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Site) private siteRepository: Repository<Site>,){}
  create(createSiteDto: Site | PassageDto) {
    return this.siteRepository.save(createSiteDto).then((error)=>{
      console.log(error);
      throw new BadRequestException("Les donneées que nous avons réçue ne sont pas celles que nous espérons");
    });
  }

  findAll() {
    return `This action returns all sites`;
  }

  findOne(id: number) {
    return `This action returns a #${id} site`;
  }

  update(id: number, updateSiteDto: any) {
    return `This action updates a #${id} site`;
  }

  remove(id: number) {
    return `This action removes a #${id} site`;
  }
}
