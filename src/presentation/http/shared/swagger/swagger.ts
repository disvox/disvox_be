import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { SWAGGER_SETTINGS } from './settings';

export const configSwagger = (app: INestApplication) => {
  const servers = ['http://localhost:5000'];

  const config = new DocumentBuilder()
    .setTitle(SWAGGER_SETTINGS.TITLE)
    .setDescription(SWAGGER_SETTINGS.DESCRIPTION)
    .setVersion(SWAGGER_SETTINGS.VERSION);

  servers.forEach((server: string) => config.addServer(server));

  const document = SwaggerModule.createDocument(app, config.build());

  SwaggerModule.setup(SWAGGER_SETTINGS.PREFIX, app, document);
};
