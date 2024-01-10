import { Entity } from '@/base';

export class UserEntity extends Entity {
  username: string;
  discriminator: string;
  email: string;
  avatarUrl: string;
  lastSeen: Date;
}
