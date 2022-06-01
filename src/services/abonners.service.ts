/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Abonner } from 'src/entities/abonner.entity';
import { Repository } from 'typeorm';
import { VerifieCard } from './../entities/verifie-card.entity';
import { VerifieCardService } from './verifie-card.service';
import { AbonnerResponseDto } from './../dto/abonner-response.dto';

@Injectable()
export class AbonnersService {
  constructor(
    @InjectRepository(Abonner) private abonnerRepository: Repository<Abonner>,
    private verifieCardService: VerifieCardService,
  ){}

  create(createAbonnerDto: any) {
    try {
      return this.abonnerRepository.create(createAbonnerDto);
    } catch (error) {
      console.log(error);
      throw new BadRequestException("impossible d ecreer un aboner");
      
    }
  }

  findAll() {
    return `This action returns all abonners`;
  }

  findOne(id: number) {
    return `This action returns a #${id} abonner`;
  }

  async findByBadge(idBadge: string): Promise<Abonner> {
      const abonney: Abonner = await  this.abonnerRepository.findOneOrFail({where:{idBadge: idBadge}}).catch((error)=>{

        console.log(error);

        throw new BadRequestException("Aucun abonner ne correspond pas à cet badge");
      })
    return abonney;
  }

  async checkAbonner(idBadge: string): Promise<AbonnerResponseDto | 3 > {
    const abonner: Abonner = await this.abonnerRepository.findOneOrFail({where:{idBadge: idBadge}}).catch(async (error)=>{
      console.log(error);

      await this.verifieCardService.create({idBadge: idBadge});
      throw new BadRequestException("0");
    });

    if(!abonner.is_active){
      this.verifieCardService.create({idBadge: idBadge, type_verifier: "DESACTIVER"});
      return 3;
    }
    const response: AbonnerResponseDto = new AbonnerResponseDto() ;
    // response.created_at = abonner.created_at as string;

    Object.keys(abonner).forEach((cle) => {
      response[cle] = abonner[cle]+ "";
    });
    const date= `${abonner.created_at.getDay}/${abonner.created_at.getMonth}/${abonner.created_at.getFullYear}`;
    response.created_at = date;
    response.statut= abonner.statut ? 1 : 0;
    return response;
  }

  update(id: number, updateAbonnerDto: any) {
    return `This action updates a #${id} abonner`;
  }

  remove(id: number) {
    return `This action removes a #${id} abonner`;
  }
}
