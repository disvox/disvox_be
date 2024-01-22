import { Entity } from '@/shared';

export class UserEntity extends Entity {
  username: string;
  discriminator: string;
  email: string;
  avatarUrl: string;
  lastSeen: Date;
}
