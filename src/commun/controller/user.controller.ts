/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { RoleName } from 'src/enums/role-name';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { UserDto } from './../dto/user.dto';

@ApiTags("Users")

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiQuery({ name: 'role', enum: RoleName })
  create(@Body() createSiteDto: UserDto): Promise<User> {
    return this.userService.create(createSiteDto);
  }

  @Post("create/all")
  createAll(@Body() createSiteDto: User[]): Promise<User[]> {
    return this.userService.createAll(createSiteDto);
  }

  @Get()
  findAll() : Promise<User[]>{
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) : Promise<User> {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSiteDto: any) {
    return this.userService.update(+id, updateSiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
