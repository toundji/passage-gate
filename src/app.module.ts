import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormConfig from './config/ormconfig';
import { ApiSocketModule } from './api-socket/api-socket.module';
import { AuthModule } from './auth/auth.module';
import { CommunModule } from './commun/commun.module';
import { PrincipaleModule } from './principale/principale.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    ApiSocketModule,
    AuthModule,
    CommunModule,
    PrincipaleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
