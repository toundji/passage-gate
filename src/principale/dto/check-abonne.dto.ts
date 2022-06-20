/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CheckAbonnerDto {
  @ApiProperty({ required: true })
  idBadge: string;
}
