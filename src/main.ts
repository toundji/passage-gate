/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     exceptionFactory: (errors: ValidationError[]) => erreur(errors),
  //   }),
  // );

  // eslint-disable-next-line prettier/prettier
  const config = new DocumentBuilder()
    .setTitle('Validation API')
    .setDescription(
      "Système de gestion du pont de payage de èkpè :  Partie API",
    )
    .setVersion('1.0')
    .addTag('cast')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/doc', app, document);
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
