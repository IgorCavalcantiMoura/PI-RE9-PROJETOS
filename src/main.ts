import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('RE9 - Projetos')
  .setDescription('Projeto Integrador Softex | Recife')
  .setContact("Softex | Recife","https://github.com/IgorCavalcantiMoura/PI-RE9-PROJETOS"," ")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00'

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
