import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import {
  AppModule,
  commonConfig,
  configSwagger,
  cookieConfig,
  TCookieConfig,
  ContextMiddleware,
} from '@/presentation';

let port: number;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // config global middlewares
  app.use(new ContextMiddleware().use);
  app.use(cookieParser(app.get<TCookieConfig>(cookieConfig.KEY).secret));

  configSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  port = app.get(commonConfig.KEY).port;
  await app.listen(port);
}
bootstrap().then(() => {
  console.log(`Server is listening at port: ${port}`);
});
