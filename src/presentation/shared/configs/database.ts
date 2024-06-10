import { ConfigType, registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  url: process.env.DATABASE_URL,
}));

export type TDatabaseConfig = ConfigType<typeof databaseConfig>;
