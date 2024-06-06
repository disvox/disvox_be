import { relations, sql } from 'drizzle-orm';
import {
  mysqlTable,
  bigint,
  mysqlEnum,
  primaryKey,
  serial,
  timestamp,
  varchar,
  json,
  boolean,
} from 'drizzle-orm/mysql-core';
import { MongoQuery } from '@casl/ability';

import { EAction, ESubject } from '@/domain';

export const actionEnum = mysqlEnum(
  'action',
  Object.values(EAction) as [EAction, ...EAction[]],
);

export const subjectEnum = mysqlEnum(
  'subject',
  Object.values(ESubject) as [ESubject, ...ESubject[]],
);

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 30 }).notNull(),
  discriminator: varchar('discriminator', { length: 30 }).notNull(),
  email: varchar('email', { length: 50 }).notNull(),
  avatarUrl: varchar('avatar_url', { length: 255 }),
  lastSeen: timestamp('last_seen'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => sql`now()`),
});

export const usersRelations = relations(users, ({ many }) => ({
  roles: many(userRoles),
  permissions: many(userPermissions),
}));

export const servers = mysqlTable('servers', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 30 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => sql`now()`),
  ownerId: bigint('owner_id', { mode: 'number', unsigned: true })
    .references(() => users.id)
    .notNull(),
});

export const userServers = mysqlTable(
  'user_servers',
  {
    userId: bigint('user_id', { mode: 'number', unsigned: true })
      .references(() => users.id)
      .notNull(),
    serverId: bigint('server_id', {
      mode: 'number',
      unsigned: true,
    })
      .references(() => servers.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.serverId] }),
  }),
);

export const permissions = mysqlTable('permissions', {
  id: serial('id').primaryKey(),
  action: actionEnum.notNull(),
  subject: subjectEnum.notNull(),
  conditions: json('conditions').$type<MongoQuery>().notNull(),
  inverted: boolean('inverted').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => sql`now()`),
});

export const permissionsRelations = relations(permissions, ({ many }) => ({
  users: many(userPermissions),
  roles: many(rolePermissions),
}));

export const roles = mysqlTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 30 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => sql`now()`),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(userRoles),
  permissions: many(rolePermissions),
}));

export const userRoles = mysqlTable(
  'user_roles',
  {
    userId: bigint('user_id', { mode: 'number', unsigned: true })
      .references(() => users.id)
      .notNull(),
    roleId: bigint('role_id', { mode: 'number', unsigned: true })
      .references(() => roles.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.roleId] }),
  }),
);

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, { fields: [userRoles.userId], references: [users.id] }),
  role: one(roles, { fields: [userRoles.roleId], references: [roles.id] }),
}));

export const rolePermissions = mysqlTable(
  'role_permissions',
  {
    roleId: bigint('role_id', { mode: 'number', unsigned: true })
      .references(() => roles.id)
      .notNull(),
    permissionId: bigint('permission_id', {
      mode: 'number',
      unsigned: true,
    })
      .references(() => permissions.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.roleId, table.permissionId] }),
  }),
);

export const rolePermissionsRelations = relations(
  rolePermissions,
  ({ one }) => ({
    role: one(roles, {
      fields: [rolePermissions.roleId],
      references: [roles.id],
    }),
    permission: one(permissions, {
      fields: [rolePermissions.permissionId],
      references: [permissions.id],
    }),
  }),
);

export const userPermissions = mysqlTable(
  'user_permissions',
  {
    userId: bigint('user_id', { mode: 'number', unsigned: true })
      .references(() => users.id)
      .notNull(),
    permissionId: bigint('permission_id', {
      mode: 'number',
      unsigned: true,
    })
      .references(() => permissions.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.permissionId] }),
  }),
);

export const userPermissionsRelations = relations(
  userPermissions,
  ({ one }) => ({
    user: one(users, {
      fields: [userPermissions.userId],
      references: [users.id],
    }),
    permission: one(permissions, {
      fields: [userPermissions.permissionId],
      references: [permissions.id],
    }),
  }),
);
