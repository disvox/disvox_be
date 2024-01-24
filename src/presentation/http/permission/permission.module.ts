import { Module } from '@nestjs/common';

import { IPermissionRepository, PermissionRepositoryToken } from '@/domain';
import { PermissionRepository } from '@/infrastructure';
import { CreatePermissionUseCase } from '@/application';

import { PermissionController } from './permission.controller';

@Module({
  controllers: [PermissionController],
  providers: [
    {
      provide: PermissionRepositoryToken,
      useFactory: () => new PermissionRepository(),
    },
    {
      provide: CreatePermissionUseCase,
      useFactory: (repository: IPermissionRepository) =>
        new CreatePermissionUseCase(repository),
      inject: [PermissionRepositoryToken],
    },
  ],
})
export class PermissionModule {}
