import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/services/auth.service';
import { LoginDto } from './../../dto/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SigninDto } from './../../dto/signin.dto';
import { User } from 'src/commun/entities/user.entity';
import { UserDto } from '../../../commun/dto/user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto): Promise<{ user: User; token: string }> {
    return this.authService.login(body);
  }

  @Post('signin')
  async signin(@Body() body: UserDto): Promise<{ user: User; token: string }> {
    return await this.authService.signin(body);
  }

  // @Get('mail-web-confirmation/:token')
  // webmailconfirm(
  //   @Param('token') token: string,
  // ): Promise<{ user: User; token: string }> {
  //   return this.authService.confirmMail(token);
  // }

  @UseGuards(AuthGuard())
  @Get('me')
  userInfo(@Req() request: any) {
    const user = request.user;
    return user;
  }
}
