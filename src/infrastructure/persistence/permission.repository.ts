import { Inject } from '@nestjs/common';

import { IPermissionRepository, Permission } from '@/domain';
import { schema, permissions } from './drizzle';
import { DRIZZLE_TOKEN } from '../token';
import { ExtendedMySql2Database } from './type';
import { eq } from 'drizzle-orm';

export class PermissionRepository implements IPermissionRepository {
  constructor(
    @Inject(DRIZZLE_TOKEN)
    private readonly drizzle: ExtendedMySql2Database<typeof schema>,
  ) {}

  async create(data: Permission): Promise<Permission> {
    const [insertedResult] = await this.drizzle
      .insert(permissions)
      .values(data);

    const [result] = await this.drizzle
      .select()
      .from(permissions)
      .where(eq(permissions.id, insertedResult.insertId));

    return result;
  }
  getById(id: string): Promise<Permission | null> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<Permission[]> {
    throw new Error('Method not implemented.');
  }
  getOne(filter: Partial<Permission>): Promise<Permission> {
    throw new Error('Method not implemented.');
  }
  getMany(filter: Partial<Permission>): Promise<Permission[]> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: Partial<Permission>): Promise<Permission> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
