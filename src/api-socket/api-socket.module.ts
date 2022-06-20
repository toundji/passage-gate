import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PassageGateway } from './gat-ways/passage.gateway';
import { PrincipaleModule } from './../principale/principale.module';
import { CommunModule } from './../commun/commun.module';
import { SiteGateway } from './gat-ways/site-getway';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => PrincipaleModule),
    forwardRef(() => CommunModule),
    forwardRef(() => AuthModule),
  ],
  providers: [PassageGateway, SiteGateway],
})
export class ApiSocketModule {}
