import { Global, Module } from '@nestjs/common';

import {
  AUTH_USE_CASE_TOKEN,
  CREATE_PERMISSION_USE_CASE_TOKEN,
  CREATE_ROLE_USE_CASE_TOKEN,
  CREATE_USER_USE_CASE_TOKEN,
  GET_USER_USE_CASE_TOKEN,
  GET_SERVERS_USE_CASE_TOKEN,
  AuthUseCase,
  CreateUserUseCase,
  GetUserUseCase,
  CreateRoleUseCase,
  CreatePermissionUseCase,
  GetServersUseCase,
} from '@/application';

@Global()
@Module({
  providers: [
    {
      provide: CREATE_USER_USE_CASE_TOKEN,
      useClass: CreateUserUseCase,
    },
    {
      provide: GET_USER_USE_CASE_TOKEN,
      useClass: GetUserUseCase,
    },
    {
      provide: CREATE_ROLE_USE_CASE_TOKEN,
      useClass: CreateRoleUseCase,
    },
    {
      provide: CREATE_PERMISSION_USE_CASE_TOKEN,
      useClass: CreatePermissionUseCase,
    },
    {
      provide: AUTH_USE_CASE_TOKEN,
      useClass: AuthUseCase,
    },
    {
      provide: GET_SERVERS_USE_CASE_TOKEN,
      useClass: GetServersUseCase,
    },
  ],
  exports: [
    CREATE_USER_USE_CASE_TOKEN,
    GET_USER_USE_CASE_TOKEN,
    CREATE_PERMISSION_USE_CASE_TOKEN,
    CREATE_ROLE_USE_CASE_TOKEN,
    AUTH_USE_CASE_TOKEN,
    GET_SERVERS_USE_CASE_TOKEN,
  ],
})
export class ApplicationModule {}
