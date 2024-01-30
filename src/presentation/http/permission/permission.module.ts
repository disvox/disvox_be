import { Module } from '@nestjs/common';

import { IPermissionRepository, PermissionRepositoryToken } from '@/domain';
import { PermissionRepository, PrismaService } from '@/infrastructure';
import { CreatePermissionUseCase } from '@/application';

import { PermissionController } from './permission.controller';

@Module({
  controllers: [PermissionController],
  providers: [
    {
      provide: PermissionRepositoryToken,
      useFactory: (prisma: PrismaService) => new PermissionRepository(prisma),
      inject: [PrismaService],
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
