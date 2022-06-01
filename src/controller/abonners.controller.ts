/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AbonnersService } from 'src/services/abonners.service';
import { Abonner } from './../entities/abonner.entity';

@Controller('abonners')
@ApiTags("Abonners")
export class AbonnersController {
  constructor(private readonly abonnersService: AbonnersService) {}

  @Post()
  create(@Body() createAbonnerDto: any) {
    return this.abonnersService.create(createAbonnerDto);
  }

  @Get()
  findAll() {
    return this.abonnersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.abonnersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAbonnerDto: Abonner) {
    return this.abonnersService.update(+id, updateAbonnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.abonnersService.remove(+id);
  }
}
