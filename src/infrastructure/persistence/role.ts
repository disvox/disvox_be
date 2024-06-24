import { Inject } from '@nestjs/common';
import { eq, inArray } from 'drizzle-orm';
import { MySqlInsertValue } from 'drizzle-orm/mysql-core';

import { IRoleRepository, Permission, Role } from '@/domain';
import { DRIZZLE_TOKEN } from '../token';
import {
  permissions,
  rolePermissions,
  roles,
  schema,
  ExtendedMySql2Database,
} from './drizzle';

export class RoleRepository implements IRoleRepository {
  constructor(
    @Inject(DRIZZLE_TOKEN)
    private readonly drizzle: ExtendedMySql2Database<typeof schema>,
  ) {}

  async createWithPermissionIds(
    data: Role,
    permissionIds: number[],
  ): Promise<Role & { permissions: Permission[] }> {
    let insertedId = 0;

    await this.drizzle.transaction(async (tx) => {
      const [insertedResult] = await tx.insert(roles).values(data);
      insertedId = insertedResult.insertId;

      await tx.insert(rolePermissions).values(
        permissionIds.map(
          (permissionId) =>
            ({
              permissionId,
              roleId: insertedId,
            } satisfies MySqlInsertValue<typeof rolePermissions>),
        ),
      );
    });

    const [roleResult] = await this.drizzle
      .select()
      .from(roles)
      .where(eq(roles.id, insertedId));

    const permissionResults = await this.drizzle
      .select()
      .from(permissions)
      .where(inArray(permissions.id, permissionIds));
    return { ...roleResult, permissions: permissionResults };
  }
  create(data: Role): Promise<Role> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<Role | null> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<Role[]> {
    throw new Error('Method not implemented.');
  }
  getOne(filter: Partial<Role>): Promise<Role | null> {
    throw new Error('Method not implemented.');
  }
  getMany(filter: Partial<Role>): Promise<Role[]> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: Partial<Role>): Promise<Role> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
