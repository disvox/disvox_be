import { Entity } from '@/shared';
import { User } from './user.entity';
import { Permission } from './permission.entity';

export class Role extends Entity {
  name: string;
  isGlobal: boolean;
}

export type TRoleRelation = {
  userId?: string;
  users?: User[];
  permissionId?: string;
  permissions?: Permission[];
};
