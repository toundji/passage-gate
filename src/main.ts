/* eslint-disable prettier/prettier */
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => (errors),
    }),
  );

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
  writeFileSync("./openapi-schema.json", JSON.stringify(document));
  SwaggerModule.setup('/api/doc', app, document);
  app.useStaticAssets(join(__dirname, "..", 'static'));
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();