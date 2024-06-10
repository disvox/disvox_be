import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR, RouterModule } from '@nestjs/core';

import {
  commonConfig,
  googleConfig,
  jwtConfig,
  databaseConfig,
  ClassSerializerInterceptor,
  cookieConfig,
} from './shared';
import {
  PermissionModule,
  AuthModule,
  UserModule,
  RoleModule,
  ServerModule,
  ContextModule,
} from './http';
import { InfrastructureModule } from './infrastructure.module';
import { ApplicationModule } from './application.module';
import { routes } from './route';

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
      load: [
        commonConfig,
        databaseConfig,
        jwtConfig,
        googleConfig,
        cookieConfig,
      ],
      cache: true,
      expandVariables: true,
    }),
    RouterModule.register(routes),
    ContextModule,
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
