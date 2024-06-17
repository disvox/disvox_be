import { Routes } from '@nestjs/core';
import {
  PermissionModule,
  UserModule,
  AuthModule,
  RoleModule,
  ServerModule,
} from './http';

export const routes: Routes = [
  {
    path: 'auth',
    module: AuthModule,
  },
  {
    path: 'permission',
    module: PermissionModule,
  },
  {
    path: 'roles',
    module: RoleModule,
  },
  {
    path: 'users',
    module: UserModule,
  },
  {
    path: 'servers',
    module: ServerModule,
  },
];
