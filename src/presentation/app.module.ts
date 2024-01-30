import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { commonConfig, googleConfig, jwtConfig } from './shared';
import { PermissionModule, AuthModule, UserModule, RoleModule } from './http';
import { PrismaService } from '@/infrastructure';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [commonConfig, jwtConfig, googleConfig],
      cache: true,
      expandVariables: true,
    }),
    PermissionModule,
    AuthModule,
    UserModule,
    RoleModule,
    {
      module: PrismaService,
      providers: [PrismaService],
      exports: [PrismaService],
      global: true,
    },
  ],
})
export class AppModule {}
