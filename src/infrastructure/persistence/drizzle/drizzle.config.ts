import { ConfigService } from '@nestjs/config';
import { defineConfig } from 'drizzle-kit';

const configService = new ConfigService();

export default defineConfig({
  schema: './src/infrastructure/persistence/drizzle/schema.ts',
  out: './src/infrastructure/persistence/drizzle/migration',
  driver: 'mysql2',
  dbCredentials: {
    uri: configService.get('DATABASE_URL') as string,
  },
});
