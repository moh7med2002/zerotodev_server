import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server)
  );
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  await app.listen(3270);
}
bootstrap();