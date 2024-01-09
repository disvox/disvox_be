import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { PrismaService, UserRepository } from '@/infrastructure/persistence';
import { UserRepository as AbstractUserRepository } from '@/domain/repositories';
import { CreateUserUseCase } from '@/use-cases/user';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: AbstractUserRepository,
      useFactory: (prisma: PrismaService) => new UserRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: CreateUserUseCase,
      useFactory: (repository: AbstractUserRepository) =>
        new CreateUserUseCase(repository),
      inject: [AbstractUserRepository],
    },
  ],
})
export class UserModule {}
