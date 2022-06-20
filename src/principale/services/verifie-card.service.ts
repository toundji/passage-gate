/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VerifieCard } from 'src/principale/entities/verifie-card.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { BaseEntity } from 'typeorm';

@Injectable()
export class VerifieCardService {

    constructor(
        @InjectRepository(VerifieCard) private verifieCardRepository: Repository<VerifieCard>,
      ){}

    create(verifieCard: {idBadge:string, type_verifier?:string }): Promise<VerifieCard  >{
            // const save: VerifieCard = new VerifieCard();
            // save.idBadge = verifieCard.idBadge;
            return this.verifieCardRepository.save(verifieCard).catch((error)=>{
                console.log(error);
      throw new BadRequestException("impossible d ecreer un aboner");
            });

      
  }

  findAll(): Promise<VerifieCard[]> {
    return this.verifieCardRepository.find();
  }

  findOne(id: number) {
    return this.verifieCardRepository.findOne({where: {id:id}});
  }

  update(id: number, updateSiteDto: any) {
    return this.verifieCardRepository.update(id, updateSiteDto);
  }
}
