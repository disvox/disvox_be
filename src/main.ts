import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

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

  configSwagger(app);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ArgumentInvalidExceptionFilter());

  port = app.get(commonConfig.KEY).port;
  await app.listen(port);
}
bootstrap().then(() => {
  console.log(`Server is listening at port: ${port}`);
});
