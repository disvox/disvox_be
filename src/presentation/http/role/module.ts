import { Module } from '@nestjs/common';

import { RoleController } from './controller';

@Module({
  controllers: [RoleController],
})
export class RoleModule {}
