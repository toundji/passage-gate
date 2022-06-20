/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class PassageDto {
  @ApiProperty({ required: true })
  site: string;

  @ApiProperty({ required: true })
  voie: string;

  @ApiProperty({ required: true })
  montant: number;

  @ApiProperty({ required: true })
  idBadge: string;

  @ApiProperty({ required: true })
  percepteur: string;
}
