import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import logger3 from './logger3';
import { LoggingInterceptor } from './interceptors/LoggingInterceptor';
import { HttpExceptionFilter } from './filters/HttpExceptionFilter';
import { TransformInterceptor } from './interceptors/TransformInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(logger3);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );

  await app.listen(3000);
}
bootstrap();
