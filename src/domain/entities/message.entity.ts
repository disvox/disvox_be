import { Entity } from '@/base';

export class MessageEntity extends Entity {
  content: string;
  userId: string;
  channelId: string;
}
