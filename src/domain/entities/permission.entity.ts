import { Entity } from '@/shared';
import { User } from './user.entity';
import { Role } from './role.entity';

export class Permission extends Entity {
  action: string;
  subject: string;
  conditions: string;
  inverted: boolean;
  system: boolean;
}

export type TPermissionRelation = {
  userId?: string;
  users?: User[];
  roleId?: string;
  roles?: Role[];
};
