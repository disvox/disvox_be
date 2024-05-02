import { Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { and, eq } from 'drizzle-orm';
import * as _ from 'lodash';

import { IUserRepository, Permission, Role, User } from '@/domain';
import { schema } from './drizzle';
import { DRIZZLE_TOKEN } from '../token';

function flattenObject(obj) {
  // If the object contains only one field, flatten it
  if (_.isObject(obj) && _.keys(obj).length === 1) {
    const key = _.keys(obj)[0];
    return flattenObject(obj[key]);
  }
  // If the object contains multiple fields, flatten its child objects
  if (_.isObject(obj) && !_.isArray(obj)) {
    const newObj = {};
    _.forEach(obj, (value, key) => {
      newObj[key] = flattenObject(value);
    });
    return newObj;
  }
  // Otherwise, return the original value
  return obj;
}

export class UserRepository implements IUserRepository {
  constructor(
    @Inject(DRIZZLE_TOKEN)
    private readonly drizzle: NodePgDatabase<typeof schema>,
  ) {}

  async getOneWithPopulate(filter: Partial<User>): Promise<
    User & {
      roles: (Role & { permissions: Permission[] })[];
      permissions: Permission[];
    }
  > {
    const conditions = Object.keys(filter).map((item) =>
      eq(schema.users[item], filter[item]),
    );

    const result = await this.drizzle.query.users.findFirst({
      where: and(...conditions),
      with: {
        roles: {
          columns: {
            roleId: false,
            userId: false,
          },
          with: {
            role: {
              with: {
                permissions: {
                  columns: {
                    roleId: false,
                    permissionId: false,
                  },
                  with: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
        permissions: {
          columns: {
            permissionId: false,
            userId: false,
          },
          with: {
            permission: true,
          },
        },
      },
    });

    return result as any;
  }

  async create(data: User): Promise<User> {
    const [result] = await this.drizzle
      .insert(schema.users)
      .values(data)
      .returning();
    return result;
  }

  getById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  async getOne(filter: Partial<User>, ability: any): Promise<User | null> {
    const conditions = Object.keys(filter).map((item) =>
      eq(schema.users[item], filter[item]),
    );
    const [result] = await this.drizzle
      .select()
      .from(schema.users)
      .where(and(...conditions));

    return result;
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
