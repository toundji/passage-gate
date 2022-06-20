/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class AbonnerDto {

  @ApiProperty({ required: true })
  idBadge: string;

  @ApiProperty({ required: true })
  nom: string;

  @ApiProperty({ required: true })
  prenom: string;

  @ApiProperty({ required: true })
  tel: string;

  @ApiProperty({ required: true })
  adresse: string;

  @ApiProperty({ required: true })
  nip: string;

  @ApiProperty({ required: true })
  iduhf: string;

  @ApiProperty({ required: true })
  codeuhf: string;

  @ApiProperty({ required: true })
  plaque: string;

  @ApiProperty({ required: true })
  essieu: string;

  @ApiProperty({ required: true })
  solde: number;

  @ApiProperty({ required: true })
  type: string;

  @ApiProperty({ required: true, default: true })
  is_active: boolean;

  @ApiProperty({ required: true, default: false })
  is_sentE: boolean;

  @ApiProperty({ required: true, default: false })
  is_sentA: boolean;

  @ApiProperty({ required: true, default: false })
  is_sentG: boolean;

  @ApiProperty({ required: true })
  statut: boolean;

}
