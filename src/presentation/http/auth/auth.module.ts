import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { jwtConfig } from '@/infrastructure/framework/configs';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService, UserRepository } from '@/infrastructure/persistence';
import { UserRepository as AbstractUserRepository } from '@/domain/repositories';
import { FindUserByEmailUseCase, RegisterUserUseCase } from '@/use-cases';
import { GoogleStrategy } from './strategies/google.strategy';

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
    AuthService,
    GoogleStrategy,
    PrismaService,
    {
      provide: AbstractUserRepository,
      useFactory: (prisma: PrismaService) => new UserRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (repository: AbstractUserRepository) =>
        new RegisterUserUseCase(repository),
      inject: [AbstractUserRepository],
    },
    {
      provide: FindUserByEmailUseCase,
      useFactory: (repository: AbstractUserRepository) =>
        new FindUserByEmailUseCase(repository),
      inject: [AbstractUserRepository],
    },
  ],
})
export class AuthModule {}
