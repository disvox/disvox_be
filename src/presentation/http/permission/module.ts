import { Module } from '@nestjs/common';

import { PermissionController } from './controller';

@Module({
  controllers: [PermissionController],
})
export class PermissionModule {}
