import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './services/jwt.strategy';
import { AuthController } from './controllers/auth/auth.controller';
import 'dotenv/config';
import { forwardRef, Module } from '@nestjs/common';
import { CommunModule } from 'src/commun/commun.module';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    forwardRef(() => CommunModule),
    JwtModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
