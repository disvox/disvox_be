import { IRepository } from '@/shared';
import { Permission, Role } from '../entities';

export interface IRoleRepository extends IRepository<Role> {
  createWithPermissionIds(
    data: Role,
    permissionIds: number[],
  ): Promise<Role & { permissions: Permission[] }>;
}
