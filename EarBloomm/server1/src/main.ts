import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
dotenv.config();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, 
    credentials: true,
  });

  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
