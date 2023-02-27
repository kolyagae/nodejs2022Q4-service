import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MyLogger } from './logging/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') ?? 4000;
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();

const logger = new MyLogger();

process
  .on('uncaughtException', (err) => {
    logger.error(err);
  })
  .on('unhandledRejection', (reason) => {
    logger.error(reason);
  });
