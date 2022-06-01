import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormConfig from './config/ormconfig';
import { Abonner } from './entities/abonner.entity';
import { AbonnersService } from './services/abonners.service';
import { AbonnersController } from './controller/abonners.controller';
import { SitesController } from './controller/sites.controller';
import { Site } from './entities/site.entity';
import { SitesService } from './services/sites.service';
import { VerifieCard } from './entities/verifie-card.entity';
import { VerifieCardService } from './services/verifie-card.service';
import { VerifieCardsController } from './controller/verifie-card.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    TypeOrmModule.forFeature([Abonner, Site, VerifieCard]),
  ],
  controllers: [
    AppController,
    AbonnersController,
    SitesController,
    VerifieCardsController,
  ],
  providers: [AppService, AbonnersService, SitesService, VerifieCardService],
})
export class AppModule {}
