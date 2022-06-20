/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { RoleName } from 'src/enums/role-name';

export class UserDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({ required: true, enum: RoleName})
  role: RoleName;

  @ApiProperty({ required: true })
  account_number: number;

  @ApiProperty({ required: true })
  email_verified_at: Date;
}
