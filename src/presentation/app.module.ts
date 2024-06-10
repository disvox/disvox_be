import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  commonConfig,
  googleConfig,
  jwtConfig,
  databaseConfig,
  ClassSerializerInterceptor,
} from './shared';
import {
  PermissionModule,
  AuthModule,
  UserModule,
  RoleModule,
  ServerModule,
} from './http';
import { InfrastructureModule } from './infrastructure.module';
import { ApplicationModule } from './application.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

const providers = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor,
  },
];

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
    ServerModule,
  ],
  providers: [...providers],
})
export class AppModule {}
