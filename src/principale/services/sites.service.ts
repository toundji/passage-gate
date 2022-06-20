/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Site } from 'src/principale/entities/site.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { PassageDto } from 'src/principale/dto/passage.dto';
import { SiteCount } from '../dto/site-count.dto';
import { VoieCount } from './../dto/voie-count';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Site) private siteRepository: Repository<Site>,){}
  create(createSiteDto: Site | PassageDto): Promise<Site>{
    return this.siteRepository.save(createSiteDto).catch((error)=>{
      console.log(error);
      throw new BadRequestException("Les donneées que nous avons réçue ne sont pas celles que nous espérons");
    });
  }

  async someMoneyByDateOfStreet(street:string): Promise<VoieCount>{
   const date:Date = new Date();
   const begin:Date = new Date(date.getFullYear()-2, date.getMonth(), date.getDate(), 23, 59, 59);
   const sum:VoieCount = await  this.siteRepository.createQueryBuilder("site")
    .select("site.voie", 'voie')
    .addSelect("site.site", "site")
    .addSelect("SUM(site.montant)", "sum")
    .where("site.voie = :voie", { voie: street })
    .andWhere('site.created_at > :start_at', { start_at: begin })
    .getRawOne<VoieCount>().catch((error)=>{
      console.log(error);
      throw new BadRequestException();
    });
    console.log(sum);
    return sum;
  }


  async someMoneyByDateOfSite(site:string): Promise<SiteCount>{
    const date:Date = new Date();
    const begin:Date = new Date(date.getFullYear()-2, date.getMonth(), date.getDate(), 23, 59, 59);

   const sum:SiteCount = await  this.siteRepository.createQueryBuilder("site")
   .select("site.site", "site")
   .addSelect("COUNT(DISTINCT(site.voie))", "nbre")
   .addSelect("SUM(site.montant)", "sum")
     .where("site.site = :site", { site: site })
     .andWhere('site.created_at > :start_at', { start_at: begin })
     .getRawOne<SiteCount>().catch((error)=>{
       console.log(error);
       throw new BadRequestException();
     });
     console.log(sum);
     return sum;
   }

  async someMoneyByDateAndStreet(): Promise<VoieCount[]>{
    const date:Date = new Date();
    const begin:Date = new Date(date.getFullYear()-2, date.getMonth(), date.getDate(), 23, 59, 59);

    const list:VoieCount[] = await  Site.createQueryBuilder("site")
    .select("site.voie", 'voie')
    .addSelect("site.site", "site")
    .addSelect("SUM(site.montant)", "sum")
    .where('site.created_at > :start_at', { start_at: begin })
    .groupBy("site.voie")
    .getRawMany<VoieCount>().catch((error)=>{
      throw new BadRequestException();
    });
    console.log(list);
    return list;
  }

  async someMoneyByDateAndStreetOfSite(site:string): Promise<VoieCount[]>{
    const date:Date = new Date();
    const begin:Date = new Date(date.getFullYear()-2, date.getMonth(), date.getDate(), 23, 59, 59);

    const list:VoieCount[] = await  Site.createQueryBuilder("site")
    .select("site.voie", 'voie')
    .addSelect("site.site", "site")
    .addSelect("SUM(site.montant)", "sum")
    .where("site.site = :site", { site: site })
    .andWhere('site.created_at > :start_at', { start_at: begin })
    .groupBy("site.voie")
    .getRawMany<VoieCount>().catch((error)=>{
      throw new BadRequestException();
    });
    return list;
  }

  async getAllStatistic(): Promise<SiteCount[]>{
    const siteCount: SiteCount[] =
    await this.someMoneyByDateAndSite();

    for (const key in siteCount) {
      if (Object.prototype.hasOwnProperty.call(siteCount, key)) {
        siteCount[key].voies = await this.someMoneyByDateAndStreetOfSite(
          siteCount[key].site,
        );
      }
    }
  return siteCount;
  }


  async someMoneyByDateAndSite(): Promise<SiteCount[]>{
    const date:Date = new Date();
    const begin:Date = new Date(date.getFullYear()-2, date.getMonth(), date.getDate(), 23, 59, 59);

    const list:SiteCount[] = await  Site.createQueryBuilder("site")
    .select("site.site", "site") 
    .addSelect("COUNT(DISTINCT(site.voie))", "nbre")
    .addSelect("SUM(site.montant)", "sum")
    .where('site.created_at > :start_at', { start_at: begin })
    .groupBy("site.site")
    .getRawMany<SiteCount>().catch((error)=>{
      console.log(error);
      throw new BadRequestException();
    });
    return list;
  }

  findAll() :Promise<Site[]>{
    return this.siteRepository.find();
  }

  findOne(id: number):Promise<Site> {
    return this.siteRepository.findOne({where:{id:id}});
  }

  update(id: number, updateSiteDto: any) {
    return this.siteRepository.update(id, updateSiteDto);
  }

  remove(id: number) {
    return this.siteRepository.softDelete(id);
  }
}
