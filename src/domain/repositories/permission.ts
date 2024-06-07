import { IRepository } from '@/shared';
import { Permission, TPermissionRelation } from '../entities';

export interface IPermissionRepository
  extends IRepository<Permission & TPermissionRelation> {}
