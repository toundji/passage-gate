/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VerifieCardService } from './../services/verifie-card.service';
import { CheckAbonnerDto } from './../dto/check-abonne.dto';

@ApiTags("verifieCards")

@Controller('verifieCards')
export class VerifieCardsController {
  constructor(private readonly verifieCardsService: VerifieCardService) {}

  @Post()
  create(@Body() createVerifieCardDto: CheckAbonnerDto) {
    return this.verifieCardsService.create(createVerifieCardDto);
  }

  @Get()
  findAll() {
    return this.verifieCardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.verifieCardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVerifieCardDto: any) {
    return this.verifieCardsService.update(+id, updateVerifieCardDto);
  }

 
}
