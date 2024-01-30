import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { AuthUseCase, GetUserUseCase } from '@/application';
import {
  IPermissionRepository,
  IRoleRepository,
  IUserRepository,
  PermissionRepositoryToken,
  RoleRepositoryToken,
  UserRepositoryToken,
} from '@/domain';
import {
  PermissionRepository,
  PrismaService,
  RoleRepository,
  UserRepository,
} from '@/infrastructure';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: UserRepositoryToken,
      useFactory: (prisma: PrismaService) => new UserRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: RoleRepositoryToken,
      useFactory: (prisma: PrismaService) => new RoleRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: PermissionRepositoryToken,
      useFactory: (prisma: PrismaService) => new PermissionRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: AuthUseCase,
      useFactory: (userRepository: IUserRepository) =>
        new AuthUseCase(userRepository),
      inject: [UserRepositoryToken],
    },
    {
      provide: GetUserUseCase,
      useFactory: (authUseCase: AuthUseCase, repository: IUserRepository) =>
        new GetUserUseCase(authUseCase, repository),
      inject: [AuthUseCase, UserRepositoryToken],
    },
  ],
})
export class UserModule {}
