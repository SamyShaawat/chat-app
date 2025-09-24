import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log('Backend running on http://localhost:' + port);
}
void bootstrap();
