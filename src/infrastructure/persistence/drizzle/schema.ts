import { sql } from 'drizzle-orm';
import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  timestamp,
  varchar,
  json,
  boolean,
} from 'drizzle-orm/pg-core';

import { EAction, ESubject } from '@/domain';

export const actionEnum = pgEnum(
  'action',
  Object.values(EAction) as [string, ...string[]],
);

export const subjectEnum = pgEnum(
  'subject',
  Object.values(ESubject) as [string, ...string[]],
);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 30 }),
  discriminator: varchar('discriminator', { length: 30 }),
  email: varchar('email', { length: 50 }),
  avatarUrl: varchar('avatar_url', { length: 255 }),
  lastSeen: timestamp('last_seen', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
    () => sql`now()`,
  ),
});

export const servers = pgTable('servers', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 30 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
    () => sql`now()`,
  ),
  ownerId: integer('owner_id').references(() => users.id),
});

export const userServers = pgTable(
  'user_servers',
  {
    userId: integer('user_id').references(() => users.id),
    serverId: integer('server_id').references(() => servers.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.serverId] }),
  }),
);

export const permissions = pgTable('permissions', {
  id: serial('id').primaryKey(),
  action: actionEnum('action').notNull(),
  subject: subjectEnum('subject').notNull(),
  conditions: json('conditions').notNull(),
  inverted: boolean('inverted').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
    () => sql`now()`,
  ),
});

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 30 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
    () => sql`now()`,
  ),
});

export const userRoles = pgTable(
  'user_roles',
  {
    userId: integer('user_id').references(() => users.id),
    roleId: integer('role_id').references(() => roles.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.roleId] }),
  }),
);

export const rolePermissions = pgTable(
  'role_permissions',
  {
    roleId: integer('role_id').references(() => roles.id),
    permissionId: integer('permission_id').references(() => permissions.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.roleId, table.permissionId] }),
  }),
);

export const userPermissions = pgTable(
  'user_permissions',
  {
    userId: integer('user_id').references(() => users.id),
    permissionId: integer('permission_id').references(() => permissions.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.permissionId] }),
  }),
);
