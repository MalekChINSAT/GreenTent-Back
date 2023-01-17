import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: "http://localhost:3001"
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true}))

  const config = new DocumentBuilder()
    .setTitle('GreenTent')
    .setDescription('GreenTent API Functionnalities')
    .setVersion('1.0')
    .addTag('Account', "Endpoints for managing a user account")
    .addTag('Bookings', 'Endpoints for managing bookings')
    .addTag('Campsites', 'Endpoints for managing campsites')
    .addTag('Authentication', 'Endpoints for  managing user authentication')
    .addTag('Reviews', 'Endpoints for managing reviews')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
