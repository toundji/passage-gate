import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { User } from 'src/commun/entities/user.entity';
import { UserService } from 'src/commun/services/user.service';
import { SigninDto } from '../dto/signin.dto';
import { UserDto } from '../../commun/dto/user.dto';

@Injectable()
export class AuthService {
  usersService: any;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async valideUser({ pseudo }: any) {
    Logger.log(pseudo);
    const user = await this.userService.findOne(pseudo);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
  async login({ username, password }: any) {
    const user = await this.userService.findOneByEmail(username);

    if (!user) {
      throw new UnauthorizedException(
        'Numéro de téléphone ou mot de passe invalide',
      );
    }

    const areEqual = await compare(password, user.password);
    if (!areEqual) {
      throw new HttpException(
        "Nom d'utilisateur ou mot de passe invalide ",
        HttpStatus.UNAUTHORIZED,
      );
    }

    // return user;
    const payload = { pseudo: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    return { user: user, token: token };
  }

  logout({ pseudo, sub }: PayloadDto) {
    const payload = { pseudo, sub };
    this.valideUser(payload);
  }

  //   async signin(user: UserDto) {
  //     const token = Math.floor(1000 + Math.random() * 9000).toString();
  //     const _user: User = await this.userService.createWithToken(user, token);
  //
  //     await this.mailService.sendUserConfirmation(_user, token);
  //     return (
  //       'Vuillez confirmer le mail que nous avons envoyé  sur votre adrese ' +
  //       user.email
  //     );
  //   }

  // async confirmMail(token: string) {
  //   const user: User = await this.userService.findByToken(token);
  //   user.save();
  //   const payload = { pseudo: user.phone ?? user.email , sub: user.id };
  //   const cle = this.jwtService.sign(payload);
  //   return { user: user, token: cle };
  // }

  async signin(data: UserDto): Promise<{ user: User; token: string }> {
    const user: User = await this.userService.create(data);
    const payload = { pseudo: user.email, sub: user.id };
    const cle = this.jwtService.sign(payload);
    return { user: user, token: cle };
  }

  verifyToken(token: string): Promise<User> {
    const payload = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    if (payload.userId) {
      return this.usersService.findOne(payload.sub);
    }
  }
}
