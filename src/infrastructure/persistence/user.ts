import { Inject } from '@nestjs/common';
import { and, eq, inArray } from 'drizzle-orm';
import { unionBy } from 'lodash';

import { IUserRepository, Permission, Role, User } from '@/domain';
import {
  permissions,
  rolePermissions,
  roles,
  schema,
  userPermissions,
  userRoles,
  users,
} from './drizzle';
import { DRIZZLE_TOKEN } from '../token';
import { ExtendedMySql2Database } from './drizzle/type';

export class UserRepository implements IUserRepository {
  constructor(
    @Inject(DRIZZLE_TOKEN)
    private readonly drizzle: ExtendedMySql2Database<typeof schema>,
  ) {}

  async getOneWithPopulate(filter: Partial<User>): Promise<
    User & {
      roles: Role[];
      permissions: Permission[];
    }
  > {
    const conditions = Object.keys(filter).map((item) =>
      eq(users[item], filter[item]),
    );

    const [userResult] = await this.drizzle
      .select()
      .from(users)
      .where(and(...conditions));

    const userRolesResults = await this.drizzle
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, userResult.id));

    const roleResults = await this.drizzle
      .select()
      .from(roles)
      .where(
        inArray(
          roles.id,
          userRolesResults.map((userRole) => userRole.roleId),
        ),
      );

    const rolePermissionsResults = await this.drizzle
      .select()
      .from(rolePermissions)
      .where(
        inArray(
          rolePermissions.roleId,
          userRolesResults.map((userRole) => userRole.roleId),
        ),
      );

    const permissionFromRolesResults = await this.drizzle
      .select()
      .from(permissions)
      .where(
        inArray(
          permissions.id,
          rolePermissionsResults.map(
            (rolePermission) => rolePermission.permissionId,
          ),
        ),
      );

    const userPermissionsResults = await this.drizzle
      .select()
      .from(userPermissions)
      .where(eq(userPermissions.userId, userResult.id));

    const permissionFromUserResults =
      userPermissionsResults.length !== 0
        ? await this.drizzle
            .select()
            .from(permissions)
            .where(
              inArray(
                permissions.id,
                userPermissionsResults.map(
                  (userPermission) => userPermission.permissionId,
                ),
              ),
            )
        : [];

    return {
      ...userResult,
      roles: roleResults,
      permissions: unionBy<Permission>(
        permissionFromRolesResults,
        permissionFromUserResults,
        'id',
      ),
    };
  }

  async create(data: User): Promise<User> {
    const [insertedResult] = await this.drizzle.insert(users).values(data);

    const [result] = await this.drizzle
      .select()
      .from(users)
      .where(eq(users.id, insertedResult.insertId));
    return result;
  }

  getById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  async getOne(filter: Partial<User>): Promise<User | null> {
    const conditions = Object.keys(filter).map((item) =>
      eq(users[item], filter[item]),
    );
    const [result] = await this.drizzle
      .select()
      .from(users)
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
