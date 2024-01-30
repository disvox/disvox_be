import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { jwtConfig } from '../../shared/configs';
import { AuthController } from './auth.controller';
import { PrismaService, UserRepository } from '@/infrastructure';
import { IUserRepository, UserRepositoryToken } from '@/domain';
import { CreateUserUseCase } from '@/application';
import { GoogleStrategy } from './strategies';
import { JwtStrategy } from './strategies';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (jwtConf: ConfigType<typeof jwtConfig>) => ({
        global: true,
        secret: jwtConf.secret,
        signOptions: { expiresIn: jwtConf.expiresIn },
      }),
      inject: [jwtConfig.KEY],
    }),
  ],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    JwtStrategy,
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
  ],
})
export class AuthModule {}
