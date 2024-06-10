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
    path: 'permission',
    module: PermissionModule,
  },
  {
    path: 'users',
    module: UserModule,
  },
  {
    path: 'auth',
    module: AuthModule,
  },
  {
    path: 'roles',
    module: RoleModule,
  },
  {
    path: 'servers',
    module: ServerModule,
  },
];
