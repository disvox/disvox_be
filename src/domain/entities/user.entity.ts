import { Entity } from '@/shared';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

export class User extends Entity {
  username: string;
  discriminator: string;
  email: string;
  avatarUrl: string;
  lastSeen: Date;
}

export type TUserRelation = {
  roleId?: string;
  roles?: Role[];
  permissionId?: string;
  permissions?: Permission[];
};
