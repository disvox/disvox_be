import { NestFactory } from '@nestjs/core';

import { AppModule } from './src/presentation/app.module';
import { commonConfig } from './src/presentation/http/shared/configs';

let port: number;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  port = app.get(commonConfig.KEY).port;
  await app.listen(port);
}
bootstrap().then(() => {
  console.log(`Server is listening at port: ${port}`);
});
