import { Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { IPermissionRepository, Permission } from '@/domain';
import { schema } from './drizzle';
import { DRIZZLE_TOKEN } from '../token';

export class PermissionRepository implements IPermissionRepository {
  constructor(
    @Inject(DRIZZLE_TOKEN)
    private readonly drizzle: NodePgDatabase<typeof schema>,
  ) {}

  async create(data: Permission): Promise<Permission> {
    const [result] = await this.drizzle
      .insert(schema.permissions)
      .values(data)
      .returning();
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
