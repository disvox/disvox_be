import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';

import {
  commonConfig,
  googleConfig,
  jwtConfig,
  databaseConfig,
  ClassSerializerInterceptor,
  cookieConfig,
  LoggerInterceptor,
  LoggerModule,
  AllExceptionFilter,
  HttpExceptionFilter,
  ValidatorExceptionFilter,
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
    useClass: LoggerInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor,
  },
  {
    provide: APP_FILTER,
    useClass: AllExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: ValidatorExceptionFilter,
  },
];

@Module({
  imports: [
    LoggerModule,
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
    AuthModule,
    PermissionModule,
    RoleModule,
    UserModule,
    ServerModule,
  ],
  providers: [...providers],
})
export class AppModule {}
