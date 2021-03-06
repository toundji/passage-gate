/* eslint-disable prettier/prettier */
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import "dotenv/config";


const secretOrKey = process.env.JWT_KEY;
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService,
    ) {
    console.log(secretOrKey);
    super({
      ignoreExpiration: false,
      // secretOrKey: ""+secretOrKey,
      secretOrKey : process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }
  async validate({pseudo}:any) {
    Logger.log(pseudo);
    const user = await this.authService.valideUser( {pseudo:pseudo} );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  checkToken(token:string){
  }
}
