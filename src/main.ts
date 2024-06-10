import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import {
  AppModule,
  AllExceptionFilter,
  HttpExceptionFilter,
  ValidatorExceptionFilter,
  commonConfig,
  configSwagger,
  cookieConfig,
  TCookieConfig,
} from '@/presentation';

let port: number;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.use(cookieParser(app.get<TCookieConfig>(cookieConfig.KEY).secret));

  configSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(
    new AllExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidatorExceptionFilter(),
  );

  port = app.get(commonConfig.KEY).port;
  await app.listen(port);
}
bootstrap().then(() => {
  console.log(`Server is listening at port: ${port}`);
});
