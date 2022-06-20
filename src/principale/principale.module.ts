import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AbonnersService } from 'src/principale/services/abonners.service';
import { SitesService } from 'src/principale/services/sites.service';
import { VerifieCardService } from 'src/principale/services/verifie-card.service';
import { AbonnersController } from './controller/abonners.controller';
import { SitesController } from './controller/sites.controller';
import { VerifieCardsController } from './controller/verifie-card.controller';
import { Abonner } from './entities/abonner.entity';
import { Site } from './entities/site.entity';
import { VerifieCard } from './entities/verifie-card.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Abonner, Site, VerifieCard]),
    forwardRef(() => AuthModule),
  ],
  controllers: [AbonnersController, SitesController, VerifieCardsController],
  providers: [AbonnersService, SitesService, VerifieCardService],
  exports: [AbonnersService, SitesService, VerifieCardService],
})
export class PrincipaleModule {}
