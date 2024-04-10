import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  commonConfig,
  googleConfig,
  jwtConfig,
  databaseConfig,
} from './shared';
import { PermissionModule, AuthModule, UserModule, RoleModule } from './http';
import { InfrastructureModule } from './infrastructure.module';
import { ApplicationModule } from './application.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [commonConfig, databaseConfig, jwtConfig, googleConfig],
      cache: true,
      expandVariables: true,
    }),
    ApplicationModule,
    InfrastructureModule,
    PermissionModule,
    AuthModule,
    UserModule,
    RoleModule,
  ],
})
export class AppModule {}
