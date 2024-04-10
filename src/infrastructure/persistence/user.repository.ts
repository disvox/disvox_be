import { Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { IUserRepository, Permission, Role, User } from '@/domain';
import { schema } from './drizzle';
import { DRIZZLE_TOKEN } from '../token';

export class UserRepository implements IUserRepository {
  constructor(
    @Inject(DRIZZLE_TOKEN)
    private readonly drizzle: NodePgDatabase<typeof schema>,
  ) {}
  getOneWithPopulate(filter: Partial<User>): Promise<
    User & {
      roles: (Role & { permissions: Permission[] })[];
      permissions: Permission[];
    }
  > {
    throw new Error('Method not implemented.');
  }
  create(data: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  getOne(filter: Partial<User>, ability: any): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  getMany(filter: Partial<User>): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: Partial<User>): Promise<User> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
