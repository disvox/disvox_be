import { Entity } from '@/shared';
import { Role } from './role';
import { Permission } from './permission';

export class User extends Entity {
  username: string;
  discriminator: string;
  email: string;
  avatarUrl: string | null;
  lastSeen: Date | null;
}

export type TUserRelation = {
  roleId?: string;
  roles?: Role[];
  permissionId?: string;
  permissions?: Permission[];
};
