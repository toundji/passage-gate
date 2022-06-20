/* eslint-disable prettier/prettier */
import { BadRequestException, forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Abonner } from 'src/principale/entities/abonner.entity';
import { Repository } from 'typeorm';
import { VerifieCardService } from './verifie-card.service';
import { Site } from 'src/principale/entities/site.entity';
import { SitesService } from './sites.service';
import { AbonnerResponseDto } from 'src/principale/dto/abonner-response.dto';
import { PassageDto } from 'src/principale/dto/passage.dto';
import { AbonnerDto } from 'src/principale/dto/abonner.dto';

@Injectable()
export class AbonnersService {
  constructor(
    @InjectRepository(Abonner) private abonnerRepository: Repository<Abonner>,
    @Inject(forwardRef(() => VerifieCardService))
    private verifieCardService: VerifieCardService,
    @Inject(forwardRef(() => SitesService))
    private siteService: SitesService,

  ){}

  create(createAbonnerDto: AbonnerDto) {
    try {
      return this.abonnerRepository.save(createAbonnerDto);
    } catch (error) {
      console.log(error);
      throw new BadRequestException("impossible d ecreer un aboner");
    }
  }

  findAll() {
    return this.abonnerRepository.find();
  }

  findOne(id: number) {
    return this.abonnerRepository.findOneBy({id:id});
  }

  async findByBadge(idBadge: string): Promise<Abonner> {
      const abonney: Abonner = await  this.abonnerRepository.findOneOrFail({where:{idBadge: idBadge}}).catch((error)=>{

        console.log(error);

        throw new BadRequestException("Aucun abonner ne correspond pas à cet badge");
      })
    return abonney;
  }

  async checkAbonner(idBadge: string): Promise<AbonnerResponseDto | 3 | 0 > {
    const abonner: Abonner = await this.abonnerRepository.findOneOrFail({where:{idBadge: idBadge}}).catch(async (error)=>{
      console.log(error);

      await this.verifieCardService.create({idBadge: idBadge});
      return null;
    });
    if(!abonner){
      return 0;
    }

    if(!abonner.is_active){
      this.verifieCardService.create({idBadge: idBadge, type_verifier: "DESACTIVER"});
      return 3;
    }
    const response: AbonnerResponseDto = new AbonnerResponseDto();
    // response.created_at = abonner.created_at as string;

    Object.keys(abonner).forEach((cle) => {
      response[cle] = abonner[cle]+ "";
    });
    const date= `${abonner.created_at.getDay()}/${abonner.created_at.getMonth()}/${abonner.created_at.getFullYear()}`;
    response.created_at = date;
    response.updated_at = `${abonner.updated_at.getDay()}/${abonner.updated_at.getMonth()}/${abonner.updated_at.getFullYear()}`;

    response.statut= abonner.statut ? 1 : 0;
    return response;
  }


  async abonnerPasse(passage: PassageDto): Promise<1 | 2 | 0 > {
     console.log("abonner Passing ....");
    const abonner: Abonner = await this.abonnerRepository.findOneOrFail({where:{idBadge: passage.idBadge}}).catch(async (error)=>{
      console.log(error);

      await this.verifieCardService.create({idBadge: passage.idBadge});
      return null;
    });
    if(!abonner){
      return 0;
    }

    const site:Site = new Site();
    const solde: number = abonner.solde;

    if(solde<passage.montant){
      return 2;
    }

    Object.keys(passage).forEach((key:string)=>{
      site[key] = passage[key];
    });
    site.abonner_id= abonner.id;

    site.solde_initial = solde;
    abonner.solde = solde - passage.montant;
    site.montant = passage.montant;
    site.montant_restant = abonner.solde;

    await this.abonnerRepository.save(abonner);

    console.log("site saving ...");

   const site_s= await this.siteService.create(site);
   console.log("site saved");

    return 1;
  }

  update(id: number, updateAbonnerDto: any) {
    return `This action updates a #${id} abonner`;
  }

  remove(id: number) {
    return `This action removes a #${id} abonner`;
  }
}
