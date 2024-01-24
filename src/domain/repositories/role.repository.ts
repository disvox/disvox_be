import { IRepository } from '@/shared';
import { Role, TRoleRelation } from '../entities';

export interface IRoleRepository extends IRepository<Role & TRoleRelation> {}
