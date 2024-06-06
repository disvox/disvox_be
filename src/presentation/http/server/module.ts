import { Module } from '@nestjs/common';

import { ServerController } from './controller';

@Module({
  controllers: [ServerController],
})
export class ServerModule {}
