import { Entity } from '@/shared';

export class User extends Entity {
  username: string;
  discriminator: string;
  email: string;
  avatarUrl: string | null;
  lastSeen: Date | null;
}
