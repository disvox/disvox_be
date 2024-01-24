import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { jwtConfig } from '../../shared/configs';
import { AuthController } from './auth.controller';
import { PrismaService, UserRepository } from '@/infrastructure';
import { IUserRepository, UserRepositoryToken } from '@/domain';
import { GetUserUseCase, CreateUserUseCase } from '@/application';
import { GoogleStrategy } from './strategies';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (jwtConf: ConfigType<typeof jwtConfig>) => ({
        global: true,
        secret: jwtConf.secret,
        signOptions: { expiresIn: parseInt(jwtConf.expiresIn) },
      }),
      inject: [jwtConfig.KEY],
    }),
  ],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    {
      provide: UserRepositoryToken,
      useFactory: (prisma: PrismaService) => new UserRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: CreateUserUseCase,
      useFactory: (repository: IUserRepository) =>
        new CreateUserUseCase(repository),
      inject: [UserRepositoryToken],
    },
    {
      provide: GetUserUseCase,
      useFactory: (repository: IUserRepository) =>
        new GetUserUseCase(repository),
      inject: [UserRepositoryToken],
    },
  ],
})
export class AuthModule {}
