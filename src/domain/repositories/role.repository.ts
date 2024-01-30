import { IRepository } from '@/shared';
import { Permission, Role } from '../entities';

export interface IRoleRepository extends IRepository<Role> {
  createWithPermissionIds(
    data: Role,
    permissionIds: string[],
  ): Promise<Role & { permissions: Permission[] }>;
}

export const RoleRepositoryToken = Symbol('IRoleRepository');
