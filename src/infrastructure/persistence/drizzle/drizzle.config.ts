import { ConfigService } from '@nestjs/config';
import type { Config } from 'drizzle-kit';

const configService = new ConfigService();

export default {
  schema: './src/infrastructure/persistence/drizzle/schema.ts',
  out: './src/infrastructure/persistence/drizzle/migration',
  driver: 'pg',
  dbCredentials: {
    connectionString: configService.get('DATABASE_URL') as string,
  },
} satisfies Config;
