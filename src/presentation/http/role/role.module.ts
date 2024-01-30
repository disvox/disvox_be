import { Module } from '@nestjs/common';

import { RoleController } from './role.controller';
import { IRoleRepository, RoleRepositoryToken } from '@/domain';
import { PrismaService, RoleRepository } from '@/infrastructure';
import { CreateRoleUseCase } from '@/application';

@Module({
  controllers: [RoleController],
  providers: [
    {
      provide: RoleRepositoryToken,
      useFactory: (prisma: PrismaService) => new RoleRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: CreateRoleUseCase,
      useFactory: (repository: IRoleRepository) =>
        new CreateRoleUseCase(repository),
      inject: [RoleRepositoryToken],
    },
  ],
})
export class RoleModule {}
