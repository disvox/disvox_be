import { Entity } from '@/shared';
import { User } from './user';
import { Role } from './role';
import { EAction, ESubject } from '../auth';

export class Permission extends Entity {
  action: EAction;
  subject: ESubject;
  conditions: Record<string, any>;
  inverted: boolean;
}

export type TPermissionRelation = {
  userId?: string;
  users?: User[];
  roleId?: string;
  roles?: Role[];
};
