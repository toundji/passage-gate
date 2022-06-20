/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class SigninDto {

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty({required:true})
    @IsPhoneNumber()
    phone: string;

    @ApiProperty({required:true})
    @IsString()
    @IsNotEmpty()
    password: string;

}
