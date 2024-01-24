import { Entity } from '@/shared';

export class User extends Entity {
  username: string;
  discriminator: string;
  email: string;
  avatarUrl: string;
  lastSeen: Date;
}

export type TUserRelation = {
  roleId?: string;
};
