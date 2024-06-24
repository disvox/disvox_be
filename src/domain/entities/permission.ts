import { Entity } from '@/shared';
import { EAction, ESubject } from '../auth';

export class Permission extends Entity {
  action: EAction;
  subject: ESubject;
  conditions: Record<string, any>;
  inverted: boolean;
}
