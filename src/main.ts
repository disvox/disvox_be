import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import {
  AppModule,
  ArgumentInvalidExceptionFilter,
  commonConfig,
  configSwagger,
} from '@/presentation';

let port: number;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.use(cookieParser());

  configSwagger(app);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ArgumentInvalidExceptionFilter());

  port = app.get(commonConfig.KEY).port;
  await app.listen(port);
}
bootstrap().then(() => {
  console.log(`Server is listening at port: ${port}`);
});
