import { relations, sql } from 'drizzle-orm';
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
  username: varchar('username', { length: 30 }).notNull(),
  discriminator: varchar('discriminator', { length: 30 }).notNull(),
  email: varchar('email', { length: 50 }).notNull(),
  avatarUrl: varchar('avatar_url', { length: 255 }),
  lastSeen: timestamp('last_seen', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
    () => sql`now()`,
  ),
});

export const usersRelations = relations(users, ({ many }) => ({
  roles: many(userRoles),
  permissions: many(userPermissions),
}));

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

export const permissionsRelations = relations(permissions, ({ many }) => ({
  users: many(userPermissions),
  roles: many(rolePermissions),
}));

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 30 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
    () => sql`now()`,
  ),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(userRoles),
  permissions: many(rolePermissions),
}));

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

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, { fields: [userRoles.userId], references: [users.id] }),
  role: one(roles, { fields: [userRoles.roleId], references: [roles.id] }),
}));

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
