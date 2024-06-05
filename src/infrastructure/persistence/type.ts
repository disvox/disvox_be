import { MySql2Client, MySql2Database } from 'drizzle-orm/mysql2';

export type ExtendedMySql2Database<T extends Record<string, unknown>> =
  MySql2Database<T> & {
    session: {
      client: MySql2Client;
    };
  };
